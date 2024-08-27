const wordpressApiUrl = process.env.WORDPRESS_API_URL || "";
const token = process.env.WORDPRESS_AUTH_REFRESH_TOKEN;
const usernameWordpress = process.env.WORDPRESS_APPLICATION_USERNAME;
const passwordWordpress = process.env.WORDPRESS_APPLICATION_PASSWORD;

import { Application, NextFunction, Request, Response } from 'express';
import { handleErrors } from "../common";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.set('Authorization', 'Basic ' + Buffer.from(usernameWordpress + ":" + passwordWordpress).toString('base64'));



export default function (app: Application): void {
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

    async function getUser(username: string, res: Response, next: NextFunction) {
        res.req.url = wordpressApiUrl + "/wp-json/wp/v2/users?search=" + username;
        const requestInit = {
            headers: myHeaders,
        } as RequestInit;

        try {
            const users = await handleFetch(requestInit, res)
            return { requestInit, users };
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    app.post('/auth/login', async (req: Request, res: Response, next: NextFunction) => {
        const { username } = req.body
        const { users } = await getUser(username, res, next);

        return res.status(200).send(users);
    });

    app.post('/auth/reset-password', async (req: Request, res: Response, next: NextFunction) => {
        const { username, password } = req.body

        const { requestInit, users } = await getUser(username, res, next);

        res.req.url = wordpressApiUrl + "/wp-json/wp/v2/users/" + users[0].id
        requestInit.method = "POST";
        requestInit.body = JSON.stringify({ password })

        try {
            const json = await handleFetch(requestInit, res)
            return res.status(200).send(json);
        } catch (error) {
            return handleErrors(next, error);
        }
    });

    app.post('/auth/modify-user', async (req: Request, res: Response, next: NextFunction) => {
        const { username } = req.body

        const { requestInit, users } = await getUser(username, res, next);

        res.req.url = wordpressApiUrl + "/wp-json/wp/v2/users/" + users[0].id
        requestInit.method = "POST";
        requestInit.body = JSON.stringify(req.body)

        try {
            const json = await handleFetch(requestInit, res)
            return res.status(200).send(json);
        } catch (error) {
            return handleErrors(next, error);
        }
    });

    app.post('/auth/sign-up', async (req: Request, res: Response, next: NextFunction) => {
        res.req.url = wordpressApiUrl + "/wp-json/wp/v2/users"

        const requestInit = {
            headers: myHeaders,
            method: "POST",
            body: JSON.stringify(req.body)
        } as RequestInit;

        try {
            const json = await handleFetch(requestInit, res)
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
            const json = await handleFetch(requestOptions, res)
            const refreshJwtAuthToken = json.data.refreshJwtAuthToken.authToken

            return res.status(200).send(refreshJwtAuthToken);
        } catch (error) {
            return handleErrors(next, error);
        }
    });

    async function handleFetch(requestOptions: RequestInit, res: Response) {
        const response = await fetch(res.req.url, requestOptions);

        // Check response status early to avoid unnecessary parsing
        if (!response.ok) {
            const errorBody = await response.json();
            console.error('Errors:', errorBody.errors);
            return res.status(response.status).json({ errors: errorBody.errors });
        }

        const json = await response.json();

        if (json.errors) {
            console.error('Errors:', json.errors);
            return res.status(400).json({ errors: json.errors });
        }
        return json;
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