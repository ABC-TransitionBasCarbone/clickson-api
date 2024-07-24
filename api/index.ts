

require('dotenv').config();


const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");
const { sql } = require("@vercel/postgres");

const PORT = process.env.PORT || 4000
const wordpressApiUrl = process.env.WORDPRESS_API_URL || "";
const token = process.env.WORDPRESS_AUTH_REFRESH_TOKEN;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", "https://clickson-tau.vercel.app"] }));

app.use("/translations", express.static(__dirname + "/public/translations"));

app.get("/", async (req, res) => {
  const users = await sql`SELECT * FROM users;`;
  return res.status(200).json({ users: users.rows.map(u => u.name) });
});

app.delete('/delete-user', async (req, res) => {
  const user = await getUser(req, res)
  console.log("🚀 ~ app.post ~ user:", user)
  const graphql = JSON.stringify({
    query: `
    mutation DeleteUser($id: ID!) {
      deleteUser(input: {id: $id}) {
        clientMutationId
        deletedId
      }
    }
    `,
    variables: { "id": user.id }
  })

  const requestOptions = getGraphQlOptions(graphql);

  try {
    const json = await handleFetch(requestOptions, res)

    const user = json.data.deleteUser.deleteId;
    console.log("🚀 ~ app.post ~ user:", user)
    return res.status(200).json("L'utilisateur a bien été supprimé " + user ?? "");
  } catch (error) {
    return handle500errors(error, res);
  }
});

app.post('/sign-up', async (req, res) => {
  const { username } = req.body

  const graphql = JSON.stringify({
    query: `
    mutation SignUp($login: String!) {
      createUser(input: {username: $login}) {
        clientMutationId
      }
    }
    `,
    variables: { "login": username }
  })

  const requestOptions = getGraphQlOptions(graphql);

  try {
    const json = await handleFetch(requestOptions, res)

    const user = json.data.createUser.clientMutationId;
    return res.status(200).json({ user });
  } catch (error) {
    return handle500errors(error, res);
  }
});

app.post('/login', async (req, res) => {
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

app.post('/reset-password', async (req, res) => {
  const { username } = req.body

  const graphql = JSON.stringify({
    query: `
    mutation ResetPassword {
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
app.post('/new-token', async (req, res) => {
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


async function getUser(req, res) {
  const { username } = req.body

  const graphql = JSON.stringify({
    query: `
    query GetUser($login: String!) {
      users(where: {login: $login}, first: 1) {
        edges {
          node {
            id
          }
        }
      }
    }
    `,
    variables: { "login": username }
  })

  const requestOptions = getGraphQlOptions(graphql);

  try {
    const json = await handleFetch(requestOptions, res)

    return json.data.users.edges[0].node;
  } catch (error) {
    return handle500errors(error, res);
  }
}

function handle500errors(error: any, res: any) {
  console.error('Fetch error:', error);
  return res.status(500).json({ error: 'Internal Server Error' });
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

async function handleFetch(requestOptions, res) {
  const response = await fetch(wordpressApiUrl, requestOptions);

  // Check response status early to avoid unnecessary parsing
  if (!response.ok) {
    const errorBody = await response.json();
    console.error('GraphQL errors:', errorBody.errors);
    return res.status(response.status).json({ errors: errorBody.errors });
  }

  const json = await response.json();

  if (json.errors) {
    console.error('GraphQL errors:', json.errors);
    return res.status(400).json({ errors: json.errors });
  }

  return json
}

module.exports = app;