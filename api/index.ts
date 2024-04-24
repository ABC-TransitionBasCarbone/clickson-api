const express = require("express");
const app = express();
const { sql } = require("@vercel/postgres");

app.get("/", async (req, res) => {
    const users = await sql`SELECT * FROM users;`;
    return res.status(200).json({ users: users.rows.map(u => u.name) });
});

module.exports = app;
