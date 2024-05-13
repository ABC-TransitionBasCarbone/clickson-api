import bcrypt from "bcrypt";
import { sql } from "@vercel/postgres";

export const signinHelper = async (email: string, password: string) => {
    const { rows } = await sql`SELECT password FROM users WHERE email = ${email};`

    if (rows.length != 1) throw Error("error in signin");
  
    return bcrypt.compare(password, rows[0].password);
};
