const { sql } = require("@vercel/postgres");
import { Application, NextFunction, Request, Response } from 'express';
import { handleErrors } from "../common";

module.exports = function (app: Application): void {

    app.get('/emission/categories/:id_language', async (req: Request, res: Response, next: NextFunction) => getEmissionCategoriesByLanguageId(req, res, next));
    app.get('/emission/sub-categories/:category_id', async (req: Request, res: Response, next: NextFunction) => getEmissionSubCategoriesByCategoryId(req, res, next));
    app.post('/emission/sub-categories', async (req: Request, res: Response, next: NextFunction) => getEmissionSubCategoriesByCategoryIds(req, res, next));

    async function getEmissionCategoriesByLanguageId(req: Request, res: Response, next: NextFunction) {
        try {
            const emission_categories = await sql`
            select * from emission_categories where id_language=${req.params.id_language}`;
            return res.status(200).json(emission_categories.rows);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function getEmissionSubCategoriesByCategoryId(req: Request, res: Response, next: NextFunction) {
        try {
            const sub_categories = await sql`
            select * from emission_sub_categories where id_emission_categorie=${req.params.category_id}`;
            return res.status(200).json(sub_categories.rows);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function getEmissionSubCategoriesByCategoryIds(req: Request, res: Response, next: NextFunction) {
        try {

            const sub_categories = await sql.query(
                `select * from emission_sub_categories 
                where id in (${req.body.join(',')})`)
            return res.status(200).json(sub_categories.rows);
        } catch (error) {
            return handleErrors(next, error);
        }
    }
}
