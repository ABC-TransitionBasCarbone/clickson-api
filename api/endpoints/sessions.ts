const { sql } = require("@vercel/postgres");
import { Application } from 'express';
import { handleErrors } from "../common";

module.exports = function (app: Application): void {
    /**
     * API: create student session
     * create session emission categories associated
     * create session emission sub categories associated
     * @returns Session
     */
    app.post('/session', async (req, res, next) => {
        try {
            // Creation of a session
            const { id_school, id_group, name, year } = req.body

            const id_student_session = await sql`
                insert into student_sessions 
                (id_school, id_group, name, year)
                values (${id_school}, ${id_group}, ${name}, ${year})
                returning id;
            `;

            // Creation of Sesssions Emission Categories
            const emissionCategories = await sql`
                select * from emission_categories order by id asc`;

            const sessionEmissionCategoriesMap = await emissionCategories.rows.map(categorie =>
                ({ id_student_session: id_student_session.rows[0].id, id_emission_categorie: categorie.id }))

            const sessionEmissionCategories = await sql.query(
                `insert into session_emission_categories (id_student_session, id_emission_categorie) values 
                ${sessionEmissionCategoriesMap.map((categorie) => {
                    return `('${categorie.id_student_session}', ${categorie.id_emission_categorie})`;
                }).join()} returning *`
            );

            // Creation of Sesssions Emissions Sub Categories
            const emissionSubCategories = (await sql`
                select * from emission_sub_categories order by id asc`).rows;

            const sessionEmissionSubCategoriesMap =
                await emissionSubCategories.map(subCategorie => {
                    const id_session_emission_categorie = sessionEmissionCategories.rows.find(categorie =>
                        categorie.id_emission_categorie === subCategorie.id_emission_categorie);

                    return {
                        id_session_emission_categorie: id_session_emission_categorie.id,
                        id_emission_sub_categorie: subCategorie.id
                    }
                })

            await sql.query(
                `insert into session_emission_sub_categories (id_session_emission_categorie, id_emission_sub_categorie) values 
                    ${sessionEmissionSubCategoriesMap.map((categorie) => {
                    return `('${categorie.id_session_emission_categorie}', ${categorie.id_emission_sub_categorie})`;
                }).join()} returning *`
            );

            return res.status(200).json("The session, their categories and sub categories has been created. id_student_session : " + id_student_session);
        } catch (error) {
            return handleErrors(next, error);
        }


    });

    /**
     * API: get student session
     * @returns Session
     */
    app.get('/sessions/:id_group', async (req, res, next) => {
        try {
            const sessions = await sql`
            select * from student_sessions where id_group=${req.params.id_group} and deleted=false and archived=false`;
            return res.status(200).json(sessions.rows);
        } catch (error) {
            return handleErrors(next, error);
        }
    });

    /**
     * API: get student session categories
     * @returns Session categories
     */
    app.get('/session-categories/:id_group', async (req, res, next) => {
        try {
            const sessionCategories = await sql`
            select * from session_emission_categories where id_student_session = ${req.params.id_group}`;
            return res.status(200).json(sessionCategories.rows);
        } catch (error) {
            return handleErrors(next, error);
        }
    });

    /**
     * API: get student session sub categories
     * @returns Session sub categories
     */
    app.get('/session-sub-categories/:id_session_emission_categorie', async (req, res, next) => {
        try {
            const sessionSubCategories = await sql`
            select * from session_emission_sub_categories 
            where id_student_session = ${req.params.id_session_emission_categorie}`;
            return res.status(200).json(sessionSubCategories.rows);
        } catch (error) {
            return handleErrors(next, error);
        }
    });

    /**
     * API : create student session-emission
     * @returns session-emission ID
     */
    app.post('/session-emission', async (req, res, next) => {
        const { id_session_emission_sub_categorie, id_emission_factor, value } = req.body
        try {
            const sessionEmission = await sql.query(`insert into session_emissions 
                    (id_session_emission_sub_categorie, id_emission_factor, value) 
                    values 
                    (${id_session_emission_sub_categorie}, ${id_emission_factor}, ${value}) 
                    returning *;`);
            return res.status(200).json("The session-emission has been created. ID : " + sessionEmission.rows[0].id);
        } catch (error) {
            return handleErrors(next, error);
        }
    })

    /**
    * API: get student session-emission
    * @returns session-emission
    */
    app.get('/session-emission/:id_session_emission_sub_categorie', async (req, res, next) => {
        try {
            const id_session_emission_sub_categorie = await sql`
           select * from session_emissions 
           where id_session_emission_sub_categorie = ${req.params.id_session_emission_sub_categorie}`;
            return res.status(200).json(id_session_emission_sub_categorie.rows);
        } catch (error) {
            return handleErrors(next, error);
        }
    });

    /**
     * API: delete student session
     * @returns session id
     */
    app.put('/sessions/:id', async (req, res, next) => {
        try {
            const id = await sql`
            update student_sessions set deleted = true where id=${req.params.id} returning id`;
            return res.status(200).json(id);
        } catch (error) {
            return handleErrors(next, error);
        }
    });
}
