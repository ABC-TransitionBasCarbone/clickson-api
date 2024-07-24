

require('dotenv').config();


const express = require("express");
export const app = express();

const cors = require("cors");
const { sql } = require("@vercel/postgres");


export const wordpressApiUrl = process.env.WORDPRESS_API_URL || "";
export const token = process.env.WORDPRESS_AUTH_REFRESH_TOKEN;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", "https://clickson-tau.vercel.app"] }));


require('./user');

app.use("/translations", express.static(__dirname + "/public/translations"));

app.get("/", async (req, res) => {
  const users = await sql`SELECT * FROM users;`;
  return res.status(200).json({ users: users.rows.map(u => u.name) });
});

// Get all fuel consumption records from an etablishement 
app.get('/fuel', async (req, res) => {
  try {
    const fuelConsumption = await sql`SELECT * FROM fuel_consumption;`;
    return res.status(200).json({ fuelConsumptions: fuelConsumption.rows.map(f => f.fuel_type) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = app;