const { sql } = require("@vercel/postgres");
import { Application } from 'express';
import { handleErrors } from "../common";

module.exports = function (app: Application): void {
    /**
     * API : create school
     * @returns School
     */
    app.post('/school', async (req, res, next) => {
        const { state, name, town_name, postal_code, student_count, staff_count, establishment_year, adress, admin_username } = req.body
        try {
            const result = await sql.query(`insert into schools 
                (state, name, town_name, postal_code, student_count, staff_count, establishment_year, adress, admin_username) 
                values 
                ('${state}', '${name}', '${town_name}', '${postal_code}', ${student_count}, ${staff_count}, ${establishment_year}, '${adress}', '${admin_username}') 
                returning *;`);
            return res.status(200).json("The school has been created. Name : " + result.rows[0].name);
        } catch (error) {
            return handleErrors(next, error);
        }
    })

    /**
     * API : update school
     * @returns School
     */
    app.put('/school', async (req, res, next) => {
        const { id, state, name, town_name, postal_code, student_count, staff_count, establishment_year, adress, admin_username } = req.body
        try {
            await sql.query(`
                update schools 
                set 
                    state = '${state}',
                    name = '${name}',
                    town_name = '${town_name}',
                    postal_code = '${postal_code}',
                    student_count = ${student_count},
                    staff_count = ${staff_count},
                    establishment_year = ${establishment_year},
                    adress = '${adress}',
                    admin_username = '${admin_username}'
                where id = ${id} ;`);
            return res.status(200).json("The school has been updated");
        } catch (error) {
            return handleErrors(next, error);
        }
    })

    /**
     * API : get school by admin name
     * @returns School
     */
    app.get('/school/:admin_username', async (req, res, next) => {
        try {
            const schools = await sql.query(`select * 
                from schools 
                where LOWER(admin_username) LIKE LOWER('${req.params.admin_username}');
            `);
            return res.status(200).json(schools.rows);
        } catch (error) {
            return handleErrors(next, error);
        }
    });
}