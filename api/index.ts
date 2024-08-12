

require('dotenv').config();


const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");
const { sql } = require("@vercel/postgres");

const PORT = process.env.PORT || 4000
const wordpressApiUrl = process.env.WORDPRESS_API_URL || "";
const token = process.env.WORDPRESS_AUTH_REFRESH_TOKEN;

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger-output.json')


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", "https://clickson-tau.vercel.app"] }));

app.use("/translations", express.static(__dirname + "/public/translations"));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


app.get("/", async (req, res) => {
  const users = await sql`SELECT * FROM users;`;
  return res.status(200).json({ users: users.rows.map(u => u.name) });
});

app.delete('/delete-user', async (req, res, next) => {
  const user = await getUser(req, res, next)
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

    const user = json.data?.deleteUser?.deleteId;
    console.log("🚀 ~ app.post ~ user:", user)
    return res.status(200).json("L'utilisateur a bien été supprimé " + user ?? "");
  } catch (error) {
    return handleErrors(next, error);
  }
});

app.post('/auth/login', async (req, res, next) => {
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

    const user = json.data?.login?.user;
    return res.status(200).json({ user });
  } catch (error) {
    return handleErrors(next, error);
  }
});

app.post('/reset-password', async (req, res, next) => {
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

    const user = json.data?.login?.user;
    return res.status(200).json({ user });
  } catch (error) {
    return handleErrors(next, error);
  }
});


/**
 * @param mettre le refreshToken toutes les heures en entrée
 * TODO gérer la durée de validité du token dans le Wordpress
 */
app.post('/new-token', async (req, res, next) => {
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
    const refreshJwtAuthToken = json.data?.refreshJwtAuthToken?.authToken

    return res.status(200).send(refreshJwtAuthToken);
  } catch (error) {
    return handleErrors(next, error);
  }
});

app.post('/auth/signup', async (req, res, next) => {
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

    const user = json.data?.registerUser?.user
    return res.status(200).send({ user });
  } catch (error) {
    return handleErrors(next, error);
  }

});


async function getUser(req, res, next) {
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
    return handleErrors(next, error);
  }
}

function handleErrors(next: any, error: any) {
  console.error('Fetch error:', error);
  next(error)
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
  return json;
}

module.exports = app;