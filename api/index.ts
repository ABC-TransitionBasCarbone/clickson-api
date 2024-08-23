

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


const fs = require('fs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", "https://clickson-tau.vercel.app"] }));

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

// Emission routes

/**
 * API: fetch emission categories, e.g : Energy and Travel ...
 * @returns Category[]
 */
app.get('/emission/categories', async (req, res, next) => {
  try {
    
    const categories = await sql`
      select * from emission_categories`;
    return res.status(200).json({ data: categories.rows});
  } catch (error) {
    return handleErrors(next, error);
  }
  
});

/**
 * API: fetch emission sub-categories
 * @returns SubCategory[]
 */
app.get('/emission/sub-categories/:category_id', async (req, res, next) => {
  try {
    const sub_categories = await sql`
      select * from emission_sub_categories where id_emission_categorie=${req.params.category_id}`;
    return res.status(200).json({ data: sub_categories.rows});
  } catch (error) {
    return handleErrors(next, error);
  }
  
});

// Energy routes
/**
 * API: fetch emission by category and sub category, e.g : Energy and Fuel
 * @param category_id
 * @param sub_category_id
 * @returns Emission[]
 */
app.post('/energy/', async (req, res, next) => {
  try {
    const { category_id, sub_category_id } = req.body
    
    const emission = await sql`
      select em.*
      from emission em
      join emission_categories ec on ec.id = em.id_emission_sub_categorie
      join emission_sub_categories esc on ec.id = esc.id_emission_categorie
      where ec.id = ${category_id} 
        and esc.id = ${sub_category_id};
    `;
    return res.status(200).json({ emission: emission.rows.map(e => e) });
  } catch (error) {
    return handleErrors(next, error);
  }
  
});

/**
 * API: fetch emission comments by category and sub category, e.g : Energy and Fuel
 * @param category_id
 * @param sub_category_id
 * @returns Comment[]
 */
app.post('/energy/comments/', async (req, res, next) => {
  try {
    const { category_id, sub_category_id } = req.body
    
    const comments = await sql`
      select co.*
      from comments co
      join emission_categories ec on ec.id = co.id_emission_sub_categorie
      join emission_sub_categories esc on ec.id = esc.id_emission_categorie
      where ec.label = ${category_id} 
        and esc.label = ${sub_category_id};
    `;
    return res.status(200).json({ comments: comments.rows.map(c => c) });
  } catch (error) {
    return handleErrors(next, error);
  }
  
});

/**
 * API: fetch emission comments by category and sub category, e.g : Energy and Fuel
 * @param category_id
 * @param sub_category_id
 * @param label
 * @param type
 * @param value
 * @returns Comment[]
 */
app.post('/energy/add/', async (req, res, next) => {
  try {
    const { category_id, sub_category_id, label, type, value, id_emission_factor } = req.body
    
    const save = await sql`
      insert into emission 
      (id_emission_sub_categorie, id_emission_factor, label, type, value)
      values (${sub_category_id}, ${id_emission_factor}, ${label}, ${type}, ${value});
    `;
    
    return res.status(200).json({ data: save });
  } catch (error) {
    return handleErrors(next, error);
  }
  
});

/**
 * API: Delete emission by id
 * @param id
 * @returns 
 */
app.delete('/energy/delete/', async (req, res, next) => {
  try {
    const { id } = req.body

    const action = await sql`
      delete from emission where id=${id};
    `;
    
    return res.status(200).json({ data: action });
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