const express = require("express");
const app = express();
const { sql } = require("@vercel/postgres");
const port = 4000

const WP_API_URL = process.env.WP_API_URL;


type LoginRequest = {
  username: string;
  password: string;
}

type JwtResponse = {
  token: string;
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req, res) => {
  // const users = await sql`SELECT * FROM users;`;
  // return res.status(200).json({ users: users.rows.map(u => u.name) });
});


app.post("/auth/signin", async (req, res) => {
  const test = await sql`INSERT INTO public.users(
        name, password)
        VALUES (${req.body.name}, ${req.body.password});`;
  console.log("🚀 ~ app.post ~ test:", test)

  return res.status(201);
});

app.post('/login', async (req, res) => {
  console.log("🚀 ~ app.post ~ password:", req.body.password)
  const { username, password } = req.body as LoginRequest;
  // try {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "username": username,
    "password": password
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "error"
  } as RequestInit;

  const response = fetch("http://localhost:3000/login", requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  console.log("🚀 ~ app.post ~ response:", response)

  return await response.then(r => r)



  // const data = await response.json() as JwtResponse;
  // if (data && data.token) {
  //   return res.json({
  //     success: true,
  //     token: data.token
  //   });
  // } else {
  //   return res.status(401).json({
  //     success: false,
  //     message: 'Invalid credentials'
  //   });
  // }

  // } catch (error) {
  //   return res.status(500).json({
  //     success: false,
  //     message: 'An error occurred',
  //     error: (error as Error).message
  //   });
  // }

});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports = app;
