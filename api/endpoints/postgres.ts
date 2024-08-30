const { sql } = require("@vercel/postgres");
import { Application, Request, Response } from 'express';
import { handleErrors } from "../common";

interface EmissionCategory {
    label: string;
}


module.exports = function (app: Application): void {

    app.get('/', async (req: Request, res: Response) => {
        try {
            const emissionCategories = await sql<EmissionCategory[]>`SELECT * FROM emission_categories;`;
            return res.status(200).json({ emissionCategories: emissionCategories.rows.map((e: EmissionCategory) => e.label) });
        } catch (error) {
            console.error('Error fetching emission categories:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });

        // Emission routes

    /**
     * API: fetch emission categories, e.g : Energy and Travel ...
     * @returns Category[]
     */
    app.get('/emission/categories', async (req, res, next) => {
        try {
    
        const categories = await sql`
            select * from emission_categories order by id asc`;
        return res.status(200).json({ data: categories.rows});
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
        return res.status(200).json({ data: sub_categories.rows});
        } catch (error) {
        return handleErrors(next, error);
        }
    
    });
    
    // Energy routes
    /**
     * API: fetch emission by category and sub category, e.g : Energy and Fuel
     * @param category_id
     * @param sub_category_id
     * @returns Emission[]
     */
    app.post('/energy/', async (req, res, next) => {
        try {
        const { sub_category_id } = req.body
    
        const emission = await sql`
            select em.*
            from emission em
            where em.id_emission_sub_categorie = ${sub_category_id};
        `;
        return res.status(200).json({ emission: emission.rows.map(e => e) });
        } catch (error) {
        return handleErrors(next, error);
        }
    
    });
    
    /**
     * API: fetch emission comments by category and sub category, e.g : Energy and Fuel
     * @param category_id
     * @param sub_category_id
     * @returns Comment[]
     */
    app.post('/energy/comments/', async (req, res, next) => {
        try {
        const { sub_category_id } = req.body
    
        const comments = await sql`
            select co.*
            from comments co
            where co.id_emission_sub_categorie = ${sub_category_id}
            order by co.created_at DESC;
        `;
        return res.status(200).json({ comments: comments.rows.map(c => c) });
        } catch (error) {
        return handleErrors(next, error);
        }
    
    });
    
    /**
     * API: add emission for energy
     * @param category_id
     * @param sub_category_id
     * @param label
     * @param type
     * @param value
     * @param id_emission_factor
     * @returns emission_id
     */
    app.post('/energy/add/', async (req, res, next) => {
        try {
        const { category_id, sub_category_id, label, type, value, id_emission_factor } = req.body
    
        const save = await sql`
            insert into emission 
            (id_emission_sub_categorie, id_emission_factor, label, type, value)
            values (${sub_category_id}, ${id_emission_factor}, ${label}, ${type}, ${value})
            returning id;
        `;
    
        return res.status(200).json({ data: save.rows[0] });
        } catch (error) {
        return handleErrors(next, error);
        }
    
    });
    
    /**
     * API: Delete emission by id
     * @param id
     * @returns 
     */
    app.delete('/energy/delete/', async (req, res, next) => {
        try {
        const { id } = req.body
    
        const action = await sql`
            delete from emission where id=${id};
        `;
    
        return res.status(200).json({ data: action });
        } catch (error) {
        return handleErrors(next, error);
        }
    
    });
    
    /**
     * API: add comment for energy
     * @param sub_category_id
     * @param comment
     * @param created_at
     * @param id_craeted_by
     * @returns comment_id
     */
    app.post('/energy/add/comment', async (req, res, next) => {
        try {
        const { sub_category_id, comment, created_at, craeted_by } = req.body
    
        const save = await sql`
            insert into comments 
            (id_emission_sub_categorie, comment, created_at, craeted_by)
            values (${sub_category_id}, ${comment}, ${created_at}, ${craeted_by})
            returning id;
        `;
    
        return res.status(200).json({ data: save.rows[0] });
        } catch (error) {
        return handleErrors(next, error);
        }
    
    });
}