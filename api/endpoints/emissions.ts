import { sql } from "@vercel/postgres";
import { Application, NextFunction, Request, Response } from 'express';
import { handleErrors } from "../common";

module.exports = function (app: Application): void {

    app.get('/emission/categories/:id_language', async (req: Request, res: Response, next: NextFunction) => getEmissionCategoriesByLanguageId(req, res, next));
    app.get('/emission/sub-categories/:category_id', async (req: Request, res: Response, next: NextFunction) => getEmissionSubCategoriesByCategoryId(req, res, next));
    app.post('/emission/sub-categories', async (req: Request, res: Response, next: NextFunction) => getEmissionSubCategoriesByCategoryIds(req, res, next));
    app.get('/emission-factors/:id_emission_sub_categorie', async (req: Request, res: Response, next: NextFunction) => getEmissionFactorsBySubCategorieId(req, res, next));

    async function getEmissionCategoriesByLanguageId(req: Request, res: Response, next: NextFunction) {
        try {
            const emission_categories = await sql`
            SELECT * 
            FROM emission_categories 
            WHERE id_language=${req.params.id_language}`;
            return res.status(200).json(emission_categories.rows);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function getEmissionSubCategoriesByCategoryId(req: Request, res: Response, next: NextFunction) {
        try {
            const sub_categories = await sql`
            SELECT * 
            FROM emission_sub_categories 
            WHERE id_emission_categorie=${req.params.category_id}`;
            return res.status(200).json(sub_categories.rows);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function getEmissionSubCategoriesByCategoryIds(req: Request, res: Response, next: NextFunction) {
        try {

            const sub_categories = await sql.query(
                `SELECT * 
                FROM emission_sub_categories 
                WHERE id in (${req.body.join(',')})`)
            return res.status(200).json(sub_categories.rows);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function getEmissionFactorsBySubCategorieId(req: Request, res: Response, next: NextFunction) {
        try {
            const emissions = await sql.query(
                `SELECT 
                    ef.id,
                    ef.label,
                    ef.value,
                    ef.uncertainty,
                    et.label AS type,
                    eu.label AS unit
                 FROM 
                    emission_factors ef
                 JOIN 
                    emission_types et ON ef.id_type = et.id
                 JOIN 
                    emission_units eu ON ef.id_unit = eu.id
                 WHERE 
                    ef.id_emission_sub_categorie = $1`,
                [req.params.id_emission_sub_categorie]
            );
            return res.status(200).json(emissions.rows);
        } catch (error) {
            return handleErrors(next, error);
        }
    }
}
