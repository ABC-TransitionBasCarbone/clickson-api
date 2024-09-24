const wordpressApiUrl = process.env.WORDPRESS_API_URL || "";
const token = process.env.WORDPRESS_AUTH_REFRESH_TOKEN;
const usernameWordpress = process.env.WORDPRESS_APPLICATION_USERNAME;
const passwordWordpress = process.env.WORDPRESS_APPLICATION_PASSWORD;

import { Application, NextFunction, Request, Response } from 'express';
import { handleErrors } from "../common";
const { sql } = require("@vercel/postgres");

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.set('Authorization', 'Basic ' + Buffer.from(usernameWordpress + ":" + passwordWordpress).toString('base64'));


module.exports = function (app: Application): void {

    app.delete("/delete-user", async (req: Request, res: Response, next: NextFunction) => {
        const { username } = req.body

        const { requestInit, users } = await getUser(username, res, next);

        requestInit.method = "DELETE";
        requestInit.body = JSON.stringify({ "reassign": "1" })

        const url = wordpressApiUrl + "/wp-json/wp/v2/users/" + users[0].id + "?force=true"

        const response = await fetch(url, requestInit);
        const user = await response.json()

        return res.status(200).json(user);

    });

    async function login(username: string, password: string, rememberMe: boolean, res: Response, next: NextFunction) {
        try {
            res.req.url = wordpressApiUrl + "/wp-json/jwt-auth/v1/token";
            const requestInit = {
                headers: myHeaders,
                method: "POST",
                body: JSON.stringify({
                    "username": username,
                    "password": password,
                    "rememberMe": rememberMe
                })
            } as RequestInit;
            const users = await handleFetch(requestInit, res, next)
            return { requestInit, users };
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    app.post('/auth/current', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await getUser(req.body.username, res, next);
            if (response) {
                return res.status(200).send(response);
            }
            return res.status(403).send({ "error": "users not found" });

        } catch (error) {
            return handleErrors(next, error);
        }
    });

    async function getUser(username: string, res: Response, next: NextFunction) {
        try {
            res.req.url = wordpressApiUrl + "/wp-json/wp/v2/users?search=" + username;
            const requestInit = {
                headers: myHeaders,
            } as RequestInit;
            const users = await handleFetch(requestInit, res, next)
            return { requestInit, users };
        } catch (error) {
            return handleErrors(next, error);
        }
    }
    app.post('/auth/login', async (req: Request, res: Response, next: NextFunction) => {
        const { username, password, rememberMe } = req.body;
        try {
            const response = await login(username, password, rememberMe, res, next);
            if (response.users) {
                return res.status(200).send(response.users);
            }
            return res.status(403).send({ "error": "users not found" });


        } catch (error) {
            return handleErrors(next, error);
        }
    });

    app.post('/auth/reset-password', async (req: Request, res: Response, next: NextFunction) => {
        const { username, password } = req.body

        const { requestInit, users } = await getUser(username, res, next);

        res.req.url = wordpressApiUrl + "/wp-json/wp/v2/users/" + users[0].id
        requestInit.method = "POST";
        requestInit.body = JSON.stringify({ password })

        try {
            const json = await handleFetch(requestInit, res, next)
            return res.status(200).send(json);
        } catch (error) {
            return handleErrors(next, error);
        }
    });


    app.post('/auth/modify-user', async (req: Request, res: Response, next: NextFunction) => {


        try {
            const { username } = req.body

            const { requestInit, users } = await getUser(username, res, next);

            res.req.url = wordpressApiUrl + "/wp-json/wp/v2/users/" + users[0].id
            requestInit.method = "POST";
            requestInit.body = JSON.stringify(req.body)
            const json = await handleFetch(requestInit, res, next)
            return res.status(200).send(json);
        } catch (error) {
            return handleErrors(next, error);
        }
    });


    app.post('/auth/sign-up', async (req: Request, res: Response, next: NextFunction) => {
        res.req.url = wordpressApiUrl + "/wp-json/wp/v2/users";
        const { email, username, first_name, last_name, password, role, state, school_name, town_name, postal_code, student_count, staff_count, establishment_year, adress } = req.body;


        if(!school_name) {
            return handleErrors(next, "Can you enter the name of the school ?");
        }

        // Check if school already exist
        let schoolFromBdd = await sql.query(`
            select * 
            from schools 
            where LOWER(name) LIKE LOWER('${school_name}');
        `);

        // The school doesn't exist so we will create it
        if (!schoolFromBdd || !schoolFromBdd.rows[0]) {
            try {
                schoolFromBdd = await sql.query(`insert into schools 
                    (state, name, town_name, postal_code, student_count, staff_count, establishment_year, adress) 
                    values 
                    ('${state}', '${school_name}', '${town_name}', '${postal_code}', ${student_count}, ${staff_count}, ${establishment_year}, '${adress}') 
                    returning id;`);
            } catch (error) {
                return handleErrors(next, error);
            }
        }

        const body = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            username: username,
            password: password,
            roles: role,
            id_school: schoolFromBdd.rows[0].id
        }

        const requestInit = {
            headers: myHeaders,
            method: "POST",
            body: JSON.stringify(body)
        } as RequestInit;

        try {
            const json = await handleFetch(requestInit, res, next)
            return res.status(200).send(json);
        } catch (error) {
            return handleErrors(next, error);
        }

    });


    /**
     * @param mettre le refreshToken toutes les heures en entrée
     * TODO gérer la durée de validité du token dans le Wordpress
     */
    app.post('/auth/new-token', async (req: Request, res: Response, next: NextFunction) => {
        const { jwtRefreshToken } = req.body

        const graphql = JSON.stringify({
            query: `
        mutation NewToken($jwtRefreshToken: String!) {
          refreshJwtAuthToken(input: {jwtRefreshToken: $jwtRefreshToken}) {
            authToken
          }
        }`,
            variables: { "jwtRefreshToken": jwtRefreshToken }
        })

        const requestOptions = getGraphQlOptions(graphql);

        try {
            const json = await handleFetch(requestOptions, res, next)
            const refreshJwtAuthToken = json.data.refreshJwtAuthToken.authToken

            return res.status(200).send(refreshJwtAuthToken);
        } catch (error) {
            return handleErrors(next, error);
        }
    });

    async function handleFetch(requestOptions: RequestInit, res: Response, next: NextFunction) {
        try {
            const response = await fetch(res.req.url, requestOptions);
            if (!response.ok) {
                const errorBody = await response.json();
                return res.status(403).send({ errors: errorBody });
            }

            return await response.json();
        }
        catch (errors) {
            return handleErrors(next, errors);

        }

    }



    function getGraphQlOptions(graphql: string) {
        const myHeadersGraphQl = new Headers();
        myHeadersGraphQl.append("Content-Type", "application/json");
        myHeadersGraphQl.append("Authorization", `Bearer ${token}`);

        return {
            method: "POST",
            headers: myHeaders,
            body: graphql,
            redirect: "follow"
        } as RequestInit;
    }

}