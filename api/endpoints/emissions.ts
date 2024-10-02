const { sql } = require("@vercel/postgres");
import { Application } from 'express';
import { handleErrors } from "../common";

module.exports = function (app: Application): void {
    /**
     * API: fetch emission categories
     * @returns Category[]
     */
    app.get('/emission/categories/:id_language', async (req, res, next) => {
        try {
            const emission_categories = await sql`
            select * from emission_categories where id_language=${req.params.id_language}`;
            return res.status(200).json(emission_categories.rows);
        } catch (error) {
            return handleErrors(next, error);
        }
    });

    /**
     * API: fetch emission sub-categories
     * @returns SubCategory[]
     */
    app.get('/emission/sub-categories/:category_id', async (req, res, next) => {
        try {
            const sub_categories = await sql`
            select * from emission_sub_categories where id_emission_categorie=${req.params.category_id}`;
            return res.status(200).json(sub_categories.rows);
        } catch (error) {
            return handleErrors(next, error);
        }
    });
}