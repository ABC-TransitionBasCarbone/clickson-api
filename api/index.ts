const express = require("express");
const app = express();
const cors = require("cors");
const { sql } = require("@vercel/postgres");
const port = 4000

app.use(cors({ origin: "http://localhost:3000" }));

app.use("/translations", express.static(__dirname + "/public/translations"));

app.get("/", async (req, res) => {
  const users = await sql`SELECT * FROM users;`;
  return res.status(200).json({ users: users.rows.map(u => u.name) });
});


app.post("/auth/signin", async (req, res) => {
  const test = await sql`INSERT INTO public.users(
        name, password)
        VALUES (${req.body.name}, ${req.body.password});`;
  console.log("🚀 ~ app.post ~ test:", test)

  return res.status(201);
});

module.exports = app;
