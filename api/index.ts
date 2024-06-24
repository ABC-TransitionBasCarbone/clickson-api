
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");
const { sql } = require("@vercel/postgres");
const port = 4000

const dotenv = require('dotenv');
dotenv.config();
const wordpressApiUrl = process.env.WORDPRESS_API_URL;
const token = process.env.WORDPRESS_AUTH_REFRESH_TOKEN;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/translations", express.static(__dirname + "/public/translations"));

app.get("/", async (req, res) => {
  // const users = await sql`SELECT * FROM users;`;
  // return res.status(200).json({ users: users.rows.map(u => u.name) });
});

app.post("/auth/signin", async (req, res) => {
  await sql`INSERT INTO public.users(
        name, password)
        VALUES (${req.body.name}, ${req.body.password});`;
  const bddInfos = await sql`SELECT password FROM users WHERE name = ${req.body.name};`
  if (bddInfos.length > 1) return res.status(500);

  const signedIn = await bcrypt.compare(req.body.password, bddInfos.rows[0].password);

  return res.status(201).send({ signedIn });
})

app.post("/auth/reset-password", async (req, res) => {
  // TODO : creer une route forgot password qui créé un token à utiliser ici plutot que le mail

  const hash = await bcrypt.hash(req.body.password, 10);
  const test = await sql`UPDATE users
        SET password = ${hash}
        WHERE name = ${req.body.name};`;
  console.log("🚀 ~ app.post ~ test:", test)
  return res.status(201);
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const graphql = JSON.stringify({
    query: `mutation LoginUser($username: String!, $password: String!) {\r\n    login(input: {username: $username, password: $password\r\n    }) {\r\n      user {\r\n        email\r\n        }\r\n    }\r\n}`,
    variables: { "username": username, "password": password }
  })
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow"
  } as RequestInit;

  const result = await fetch(wordpressApiUrl, requestOptions)
  const json = await result.json();
  console.log("🚀 ~ app.post ~ json:", json)

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  console.log("🚀 ~ app.post ~ json.data.user:", json.data.login.user)

  return json.data.login.user;
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports = app;
