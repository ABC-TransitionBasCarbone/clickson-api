const { sql } = require("@vercel/postgres");
import { Application } from 'express';
import { handleErrors } from "../common";

module.exports = function (app: Application): void {

    /**
     * API: delete student session
     * @returns session id
     */
    app.put('/sessions/:id', async (req, res, next) => {
        try {
            const id = await sql`
                update session_students set deleted = true where id='${req.params.id}' returning id`;
            return res.status(200).json(id);
        } catch (error) {
            return handleErrors(next, error);
        }
    });

    /**
     * API: create student session
     * create session emission categories associated
     * create session emission sub categories associated
     * @returns Session
     */
    app.post('/sessions', async (req, res, next) => {
        try {
            const { id_school, id_group, name, year } = req.body

            const sessions = await sql`
                insert into session_students 
                (id_school, id_group, name, year)
                values (${id_school}, ${id_group}, ${name}, ${year})
                returning *;
            `;

            // Creation of student Sesssions Emission Categories for each categories
            const emissionCategories = await sql`
                select * from emission_categories where id_language = 1`;

            const sessionEmissionCategoriesMap = await emissionCategories.rows.map(categorie =>
                ({ id_session_student: sessions.rows[0].id, id_emission_categorie: categorie.id }))

            const sessionEmissionCategories = await sql.query(
                `insert into session_emission_categories (id_session_student, id_emission_categorie) values 
                ${sessionEmissionCategoriesMap.map((categorie) => {
                    return `('${categorie.id_session_student}', ${categorie.id_emission_categorie})`;
                }).join()} returning *`
            );

            // Creation of Sesssions Emissions Sub Categories for each sub categories
            const emissionSubCategories = (await sql`
                select * from emission_sub_categories where id_language = 1`).rows;

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

            return res.status(200).json(sessions.rows);
        } catch (error) {
            return handleErrors(next, error);
        }
    });

    /**
     * API : put student session
     */
    app.put('/sessions', async (req, res, next) => {
        const { id, id_school, name, year, archived, deleted } = req.body
        try {
            await sql.query(`
                        update session_students
                        set
                            id_school='${id_school}',
                            name='${name}',
                            year=${year},
                            archived=${archived},
                            deleted=${deleted}
                        where id = '${id}';
                    `);
            return res.status(200).json(id);
        } catch (error) {
            return handleErrors(next, error);
        }
    })

    /**
     * API: get student session by id group
     * @returns Session
     */
    app.get('/sessions/:id', async (req, res, next) => {
        try {
            const sessions = await sql`
            select * from session_students where id=${req.params.id} and deleted=false and archived=false`;
            return res.status(200).json(sessions.rows);
        } catch (error) {
            return handleErrors(next, error);
        }
    });

    /**
     * API: get student session by id session
     * @returns Session
     */
    app.get('/sessions', async (req, res, next) => {
        try {
            const sessions = await sql`
            select * from session_students where id_group=${req.query.id_group} and deleted=false and archived=false`;
            return res.status(200).json(sessions.rows);
        } catch (error) {
            return handleErrors(next, error);
        }
    });

    /**
     * API: get student session categories by id_session_student
     * @returns Session categories
     */
    app.get('/session-categories/:id_session_student', async (req, res, next) => {
        try {
            const sessionCategories = await sql`
            select * from session_emission_categories where id_session_student = ${req.params.id_session_student}`;
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
            const sessionSubCategories = await sql.query(`
            select * from session_emission_sub_categories 
            where id_session_emission_categorie = '${req.params.id_session_emission_categorie}'            `);
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
           where id_session_emission_sub_categorie = '${req.params.id_session_emission_sub_categorie}'`;
            return res.status(200).json(id_session_emission_sub_categorie.rows);
        } catch (error) {
            return handleErrors(next, error);
        }
    });
}
