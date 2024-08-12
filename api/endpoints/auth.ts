const wordpressApiUrl = process.env.WORDPRESS_API_URL || "";
const token = process.env.WORDPRESS_AUTH_REFRESH_TOKEN;
const usernameWordpress = process.env.WORDPRESS_APPLICATION_USERNAME;
const passwordWordpress = process.env.WORDPRESS_APPLICATION_PASSWORD;

import { handle500errors } from "../common";

module.exports = function (app) {
    app.delete("/delete-user", async (req, res) => {
        const { username } = req.body

        const { requestInit, users } = await getUser(username);

        requestInit.method = "DELETE";
        requestInit.body = JSON.stringify({ "reassign": "1" })

        const urlDelete = wordpressApiUrl + "/wp-json/wp/v2/users/" + users[0].id + "?force=true"

        const response = await fetch(urlDelete, requestInit);
        const usersDeleted = await response.json()

        return res.status(200).json(usersDeleted);

    });

    async function getUser(username: string) {
        const urlGet = wordpressApiUrl + "/wp-json/wp/v2/users?slug=" + username;
        console.log("🚀 ~ getUser ~ urlGet:", urlGet)

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.set('Authorization', 'Basic ' + Buffer.from(usernameWordpress + ":" + passwordWordpress).toString('base64'));

        const requestInit = {
            headers: myHeaders,
        } as RequestInit;

        const responseGet = await fetch(urlGet, requestInit);
        const users = await responseGet.json();
        return { requestInit, users };
    }


    app.post('/auth/login', async (req, res) => {
        const { username, password } = req.body
     
        const graphql = JSON.stringify({
            query: `
        mutation LoginUser($username: String!, $password: String!) {
            login(input: {username: $username, password: $password
            }) {
              user {
                email
                }
            }
        }
        `,
            variables: { "username": username, "password": password }
        })

        const requestOptions = getGraphQlOptions(graphql);

        try {
            const json = await handleFetch(requestOptions, res)

            const user = json.data.login.user;
            return res.status(200).json({ user });
        } catch (error) {
            return handle500errors(error, res);
        }
    });

    app.post('/auth/reset-password', async (req, res) => {
        const { username } = req.body

        const graphql = JSON.stringify({
            query: `
        mutation ResetPassword($username: String!) {
          sendPasswordResetEmail(input: {username: $username}) {
            clientMutationId
            success
          }
        }
        `,
            variables: { "username": username }
        })

        const requestOptions = getGraphQlOptions(graphql);

        try {
            const json = await handleFetch(requestOptions, res)

            const user = json.data.login.user;
            return res.status(200).json({ user });
        } catch (error) {
            return handle500errors(error, res);
        }
    });


    /**
     * @param mettre le refreshToken toutes les heures en entrée
     * TODO gérer la durée de validité du token dans le Wordpress
     */
    app.post('/auth/new-token', async (req, res) => {
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
            return handle500errors(error, res);
        }
    });

    app.post('/auth/signup', async (req, res) => {
        const { email, password, firstName, lastName, country, ecole } = req.body
        const username = email.split("@")[0]

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const graphql = JSON.stringify({
            query: `
        mutation registerUser(
          $username: String!, 
          $password: String!,
          $email: String!, 
          $firstName: String!,
          $lastName: String!
        ) {
          registerUser(
            input: {
              username: $username
              email: $email, 
              firstName: $firstName, 
              lastName: $lastName,
              password: $password
            }
          ) {
            clientMutationId
            user {
              id
              name
              email
            }
          }
        }
      `,
            variables: { "username": username, "password": password, "email": email, "firstName": firstName, "lastName": lastName }
        })

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: graphql,
            redirect: "follow"
        } as RequestInit;

        try {
            const result = await fetch(wordpressApiUrl, requestOptions)
            const json = await result.json();

            if (json.errors) {
                console.error(json.errors);
                const message = json.errors[0].message;
                return res.status(500).send({ message });
            }

            const user = json.data.registerUser.user
            return res.status(200).send({ user });
        } catch (error) {
            return handle500errors(error, res);
        }

    });

    async function handleFetch(requestOptions, res) {
        const response = await fetch(requestOptions.url, requestOptions);
        console.log("🚀 ~ handleFetch ~ requestOptions.url:", requestOptions.url)

        // Check response status early to avoid unnecessary parsing
        if (!response.ok) {
            const errorBody = await response.json();
            // console.error('Errors:', errorBody.errors);
            return res.status(response.status).json({ errors: errorBody.errors });
        }

        const json = await response.json();



        if (json.errors) {
            // console.error('Errors:', json.errors);
            return res.status(400).json({ errors: json.errors });
        }
        console.log("🚀 ~ handleFetch ~ json[0]:", json[0])

        return res.status(200).json(json[0]);
    }



    function getGraphQlOptions(graphql: string) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        return {
            method: "POST",
            headers: myHeaders,
            body: graphql,
            redirect: "follow"
        } as RequestInit;
    }

}