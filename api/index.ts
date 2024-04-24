const express = require("express");
const app = express();
const { sql } = require("@vercel/postgres");
const { VercelRequest, VercelResponse } = require("@vercel/node")

// app.listen(3000, () => console.log("Server ready on port 3000."));

app.get("/", async (req, res) => {
    try {
        const users = await sql`SELECT * FROM users;`;
        return res.status(200).json({ users: users.rows.map(u => u.name) });
    } catch (e) {
        res.status(500).json({ error: e })
    }
});


module.exports = app;
