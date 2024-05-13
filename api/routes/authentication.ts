import express from "express";
import bcrypt from "bcrypt";
import { sql } from "@vercel/postgres";
import { randomBytes } from "node:crypto";

const router = express.Router();

router.post("/signin", async (req, res) => {
    const { rows } = await sql`SELECT password FROM users WHERE name = ${req.body.name};`
    if (rows.length != 1) return res.status(500).send();
  
    const signedIn = await bcrypt.compare(req.body.password, rows[0].password);
  
    return res.status(201).send({ signedIn });
  })
  
  router.post("/reset-password", async (req, res) => {
    console.log("here");
    const { rows } = await sql`SELECT reset_pwd_token FROM users WHERE name = ${req.body.email};`
    console.log("rows", rows);
    const hashedTokenForBdd = await bcrypt.hash(req.body.token, 10); //to remove

    const isTokenValid = await bcrypt.compare(rows[0].reset_pwd_token, hashedTokenForBdd); 
    // const isTokenValid = await bcrypt.compare(req.body.token, rows[0].reset_pwd_token);  
    console.log(isTokenValid, req.body.token, rows[0].reset_pwd_token, hashedTokenForBdd);
    if (!isTokenValid) return res.status(500).send({ message: "token is not valid" });

    const hash = await bcrypt.hash(req.body.password, 10);
    const test = await sql`UPDATE users
          SET password = ${hash}
          WHERE name = ${req.body.email};`;
  
    return res.status(201).send();
  });

  router.post("/forgot-password", async (req, res) => {
    try {
      const { rows } = await sql`SELECT name FROM users WHERE name = ${req.body.email}`
      if (rows.length != 1) res.status(500).send();
  
      const resetToken = randomBytes(32).toString("hex");
      const hashedTokenForBdd = await bcrypt.hash(resetToken, 10);
      
      await sql`UPDATE users SET reset_pwd_token = 1 WHERE name = ${req.body.email}`
      // await sql`UPDATE users SET reset_pwd_token = ${hashedTokenForBdd} WHERE name = ${req.body.email}`
  
      return res.status(201).send({ resetLink: resetToken });
    } catch(e) {
      console.error(e);
    }
  });

  export default router;
