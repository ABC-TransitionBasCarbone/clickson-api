

require('dotenv').config();


const express = require("express");
export const app = express();

const cors = require("cors");
const { sql } = require("@vercel/postgres");


export const wordpressApiUrl = process.env.WORDPRESS_API_URL || "";
export const token = process.env.WORDPRESS_AUTH_REFRESH_TOKEN;

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger-output.json')


const fs = require('fs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", "https://clickson-tau.vercel.app"] }));


require('./user');

app.use("/translations", express.static(__dirname + "/public/translations"));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.get('/countries', (req, res) => {
  fs.readFile(__dirname + "/public/countries/countries.json", 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Failed to load data' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

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

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };


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

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    if (json.errors) {
      console.error(json.errors);
      const message = json.errors[0].message;
      return res.status(500).json({ message });
    }
    const user = json.data?.registerUser?.user
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
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

/**
 * get emission categrories by student session id
 */
app.get('/emission-categories/:studentSessionId', async (req, res) => {
  const studentSessionId = res.json(req.params).studentSessionId;

  try {
    const emissionCategories = await sql`SELECT * FROM emission_categories WHERE id=${studentSessionId};`;
    return res.status(200).json(emissionCategories.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * get emission sub categrories by emission categrories id
 */
app.get('/emission-sub-categories/:emissionCategorieId', async (req, res) => {
  const emissionCategorieId = res.json(req.params).emissionCategorieId;

  try {
    const emissionSubCategories = await sql`SELECT * FROM emission_sub_categoriess WHERE id=${emissionCategorieId};`;
    return res.status(200).json(emissionSubCategories.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * get comments by emission sub categrories id
 */
app.get('/comments/:emissionSubCategorieId', async (req, res) => {
  const emissionSubCategorieId = res.json(req.params).emissionSubCategorieId;

  try {
    const comments = await sql`SELECT * FROM comments WHERE id=${emissionSubCategorieId};`;
    return res.status(200).json(comments.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * get emissions by emission sub categrories id
 */
app.get('/emissions/:emissionSubCategorieId', async (req, res) => {
  const emissionSubCategorieId = res.json(req.params).emissionSubCategorieId;

  try {
    const emission = await sql`SELECT * FROM emission WHERE id=${emissionSubCategorieId};`;
    return res.status(200).json(emission.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = app;