const wordpressApiUrl = process.env.WORDPRESS_API_URL || "";
const usernameWordpress = process.env.WORDPRESS_APPLICATION_USERNAME;
const passwordWordpress = process.env.WORDPRESS_APPLICATION_PASSWORD;

import { Application, NextFunction, Request, Response } from 'express';
import { handleErrors, handleFetch } from "../common";
const { sql } = require("@vercel/postgres");

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.set('Authorization', 'Basic ' + Buffer.from(usernameWordpress + ":" + passwordWordpress).toString('base64'));

module.exports = function (app: Application): void {

    app.delete("/delete-user", deleteUser);
    app.post('/auth/login', login);
    app.post('/auth/current', getUser);

    async function deleteUser(req: Request, res: Response, next: NextFunction) {
        const { username } = req.body

        const { requestInit, users } = await getUser(username, res, next);

        requestInit.method = "DELETE";
        requestInit.body = JSON.stringify({ "reassign": "1" })

        const url = wordpressApiUrl + "/wp-json/wp/v2/users/" + users[0].id + "?force=true"

        const response = await fetch(url, requestInit);
        const user = await response.json()

        return res.status(200).json(user);

    }

    async function login(req: Request, res: Response, next: NextFunction) {
        const { username, password, rememberMe } = req.body;

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
            const user = await handleFetch(requestInit, res, next)
            if (user) {
                return res.status(200).send(user);
            }
            return res.status(403).send({ "error": "user not found" });

        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function getUser(req: Request, res: Response, next: NextFunction) {
        res.req.url = wordpressApiUrl + "/wp-json/wp/v2/users?search=" + req.body.username;
        const requestInit = {
            headers: myHeaders,
            method: "POST"
        } as RequestInit;
        try {

            const users = await handleFetch(requestInit, res, next)
            return { requestInit, users }

        } catch (error) {
            return handleErrors(next, error);
        }
    }

    app.post('/auth/reset-password', async (req: Request, res: Response, next: NextFunction) => {
        const { username, password } = req.body

        const { requestInit, users } = await getUser(req, res, next);

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
        const { email, first_name, last_name, password, role, state, school_name, town_name, postal_code, student_count, staff_count, establishment_year, adress } = req.body;

        if (!school_name) {
            return handleErrors(next, "Can you enter the name of the school ?");
        }

        // Check if school already exist
        let schoolFromBdd = await sql.query(`
            select * from schools 
            where postal_code LIKE '${postal_code}' and LOWER(school_name) LIKE LOWER('${school_name}');
        `);

        // The school doesn't exist so we will create it
        if (!schoolFromBdd || !schoolFromBdd.rows[0]) {
            try {
                schoolFromBdd = await sql.query(`
                    insert into schools 
                        (state, name, town_name, postal_code, student_count, staff_count, establishment_year, adress, admin_username) 
                        values 
                        ('${state}', '${school_name}', '${town_name}', '${postal_code}', ${student_count}, ${staff_count}, ${establishment_year}, '${adress}', '${email}') 
                    returning id;
                    `);
            } catch (error) {
                return handleErrors(next, error);
            }
        }

        const body = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            username: email,
            password: password,
            roles: role,
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
}
