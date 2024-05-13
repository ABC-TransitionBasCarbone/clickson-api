const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
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

module.exports = app;
