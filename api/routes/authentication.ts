import express from "express";
import bcrypt from "bcrypt";
import { sql }from "@vercel/postgres";

const router = express.Router();

router.post("/signin", async (req, res) => {
    const bddInfos = await sql`SELECT password FROM users WHERE name = ${req.body.name};`
    if (bddInfos.rows.length > 1) return res.status(500);
  
    const signedIn = await bcrypt.compare(req.body.password, bddInfos.rows[0].password);
  
    return res.status(201).send({ signedIn });
  })
  
  router.post("/reset-password", async (req, res) => {
    // TODO : creer une route forgot password qui créé un token à utiliser ici plutot que le mail
  
    const hash = await bcrypt.hash(req.body.password, 10);
    const test = await sql`UPDATE users
          SET password = ${hash}
          WHERE name = ${req.body.name};`;
    console.log("🚀 ~ app.post ~ test:", test)
  
    return res.status(201).send();
  });

  export default router;
