const { sql } = require("@vercel/postgres");
import { Application } from 'express';
import { handleErrors } from "../common";

module.exports = function (app: Application): void {




    /**
     * API: fetch emission categories
     * @returns Category[]
     */
    app.get('/emission/categories', async (req, res, next) => {
        try {
            const emission_categories = await sql`
            select * from emission_categories`;
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

    /**
     * API: fetch emission sub-categories
     * @returns SubCategory[]
     */
    app.get('/emission/sub-categories', async (req, res, next) => {
        try {
            const sub_categories = await sql`
            select * from emission_sub_categories`;
            return res.status(200).json(sub_categories.rows);
        } catch (error) {
            return handleErrors(next, error);
        }

    });

    /**
     * API : create group
     * @returns Group
     */
    app.post('/groups', async (req, res, next) => {
        const { id_school, teacher_username, name, year } = req.body
        try {
            const id_group = await sql`
                    insert into student_sessions 
                    (id_school, teacher_username, name, year)
                    values (${id_school}, ${teacher_username}, ${name}, ${year})
                    returning id;
                `;
            return res.status(200).json("The school has been created. Name : " + id_group.rows[0].id);
        } catch (error) {
            return handleErrors(next, error);
        }
    })

    /**
     * API: get student session
     * @returns Session
     */
    app.get('/groups/:teacher_username', async (req, res, next) => {
        try {
            const sessions = await sql`
                select * from groups where teacher_username=${req.params.teacher_username} and deleted=false and archived=false`;
            return res.status(200).json(sessions.rows);
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
    app.get('/sessions/:year', async (req, res, next) => {
        try {
            const sessions = await sql`
            select * from student_sessions where year=${req.params.year} and deleted=false and archived=false`;
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
            select * from session_emission_sub_categories where id_student_session = ${req.params.id_session_emission_categorie}`;
            return res.status(200).json(sessionSubCategories.rows);
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

    /**
     * API: archive student session
     * @returns session id
     */
    app.put('/sessions/:id', async (req, res, next) => {
        try {
            const id = await sql`
            update student_session set archive = true where id=${req.params.id} returning id`;
            return res.status(200).json(id);
        } catch (error) {
            return handleErrors(next, error);
        }
    });



    /**
     * API : create school
     * @returns School
     */
    app.post('/school', async (req, res, next) => {
        const { state, name, town_name, postal_code, student_count, staff_count, establishment_year, adress } = req.body
        try {
            const result = await sql.query(`insert into schools 
                (state, name, town_name, postal_code, student_count, staff_count, establishment_year, adress) 
                values 
                ('${state}', '${name}', '${town_name}', '${postal_code}', ${student_count}, ${staff_count}, ${establishment_year}, '${adress}') 
                returning *;`);
            return res.status(200).json("The school has been created. Name : " + result.rows[0].name);
        } catch (error) {
            return handleErrors(next, error);
        }
    })

    /**
     * API : get school
     * @returns School
     */
    app.get('/school/:name', async (req, res, next) => {
        try {
            const sessions = await sql.query(`select * 
                from schools 
                where LOWER(name) LIKE LOWER('${req.params.name}');
            `);
            return res.status(200).json(sessions.rows);
        } catch (error) {
            return handleErrors(next, error);
        }
    });














    /**
     * TODO Change this energy into common emissions
     */
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
            from emissions em
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
            insert into emissions 
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
            delete from emissions where id=${id};
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