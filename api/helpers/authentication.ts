import bcrypt from "bcrypt";
import { sql } from "@vercel/postgres";
import { randomBytes } from "node:crypto";

export const signinHelper = async (email: string, password: string) => {
    const { rows } = await sql`SELECT password FROM users WHERE email = ${email};`

    if (rows.length != 1) throw Error("error in signin");
  
    return bcrypt.compare(password, rows[0].password);
};

export const resetPasswordHelper = async (email: string, token: string, newPassword: string) => {
    const { rows } = await sql`SELECT reset_pwd_token FROM users WHERE email = ${email};`

    const isTokenValid = await bcrypt.compare(token, rows[0].reset_pwd_token);  

    if (!isTokenValid) throw Error("token is not valid");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await sql`UPDATE users
          SET password = ${hashedPassword}
          WHERE email = ${email};`;
};

export const forgotPasswordHelper = async (email: string) => {
    const { rows } = await sql`SELECT name FROM users WHERE email = ${email}`
    if (rows.length != 1) throw Error("error in forgot password");

    const resetToken = randomBytes(32).toString("hex");
    const hashedTokenForBdd = await bcrypt.hash(resetToken, 10);
    
    await sql`UPDATE users SET reset_pwd_token = ${hashedTokenForBdd} WHERE email = ${email}`

    return resetToken;
};
