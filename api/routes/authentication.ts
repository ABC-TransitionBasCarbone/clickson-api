import express from "express";
import bcrypt from "bcrypt";
import { sql } from "@vercel/postgres";
import { randomBytes } from "node:crypto";
import { signin } from "../controllers/authentication";

const router = express.Router();

router.post("/signin", signin);
  
  router.post("/reset-password", async (req, res) => {
    const { rows } = await sql`SELECT reset_pwd_token FROM users WHERE email = ${req.body.email};`

    const isTokenValid = await bcrypt.compare(req.body.token, rows[0].reset_pwd_token);  

    if (!isTokenValid) return res.status(500).send({ message: "token is not valid" });

    const hash = await bcrypt.hash(req.body.password, 10);
    await sql`UPDATE users
          SET password = ${hash}
          WHERE email = ${req.body.email};`;
  
    return res.status(201).send();
  });

  router.post("/forgot-password", async (req, res) => {
    try {
      const { rows } = await sql`SELECT name FROM users WHERE email = ${req.body.email}`
      if (rows.length != 1) res.status(500).send({ message: "error in login"});
  
      const resetToken = randomBytes(32).toString("hex");
      const hashedTokenForBdd = await bcrypt.hash(resetToken, 10);
      
      await sql`UPDATE users SET reset_pwd_token = ${hashedTokenForBdd} WHERE email = ${req.body.email}`
  
      return res.status(201).send({ resetLink: resetToken });
    } catch(e) {
      console.error(e);
    }
  });

  export default router;
