const { sql } = require("@vercel/postgres");
import { Application, NextFunction, Request, Response } from 'express';
import { handleErrors } from "../common";

module.exports = function (app: Application): void {
    app.get('/languages/:language_code', getLanguage);

    async function getLanguage(req: Request, res: Response, next: NextFunction) {
        try {
            const languages = await sql`
                select * from languages where language_code=${req.params.language_code}`;
            return res.status(200).json(languages.rows[0].id);
        } catch (error) {
            return handleErrors(next, error);
        }
    }
}
