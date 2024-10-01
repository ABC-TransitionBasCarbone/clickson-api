const { sql } = require("@vercel/postgres");
import { Application } from 'express';
import { handleErrors } from "../common";

module.exports = function (app: Application): void {
    /**
     * API: get languages
     * @returns Languages
     */
    app.get('/languages/:language_code', async (req, res, next) => {
        try {
            const languages = await sql`
                select * from languages where language_code=${req.params.language_code}`;
            return res.status(200).json(languages.rows[0].id);
        } catch (error) {
            return handleErrors(next, error);
        }
    });
}