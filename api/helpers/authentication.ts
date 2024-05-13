import bcrypt from "bcrypt";
import { sql } from "@vercel/postgres";
import { randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";

export const signinHelper = async (username: string, password: string) => {
    const { rows } = await sql`SELECT password, username FROM users WHERE username = ${username};`

    if (rows.length != 1) throw Error("The username or password is not correct");
  
    const user = rows[0];

    const isPasswordCorrect = bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw Error("The username or password is not correct");

    const token = jwt.sign(
        { userId: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );

    return token;
};

export const resetPasswordHelper = async (username: string, token: string, newPassword: string) => {
    const { rows } = await sql`SELECT reset_pwd_token FROM users WHERE username = ${username};`

    const isTokenValid = await bcrypt.compare(token, rows[0].reset_pwd_token);  

    if (!isTokenValid) throw Error("token is not valid");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await sql`UPDATE users
          SET password = ${hashedPassword}
          WHERE username = ${username};`;
};

export const forgotPasswordHelper = async (username: string) => {
    const { rows } = await sql`SELECT name FROM users WHERE username = ${username}`
    if (rows.length != 1) throw Error("error in forgot password");

    const resetToken = randomBytes(32).toString("hex");
    const hashedTokenForBdd = await bcrypt.hash(resetToken, 10);
    
    await sql`UPDATE users SET reset_pwd_token = ${hashedTokenForBdd} WHERE username = ${username}`

    return resetToken;
};
