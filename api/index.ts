import express from "express";
const cors = require("cors");
import { sql }from "@vercel/postgres";
import authentication from "./routes/authentication";
import { authorization } from "./middleware/authorization";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/translations", express.static(__dirname + "/public/translations"));

app.get("/", authorization, async (req, res) => {
  const users = await sql`SELECT * FROM users;`;
  return res.status(200).json({ users: users.rows.map(u => u.name) });
});

app.use("/auth", authentication);

module.exports = app;
