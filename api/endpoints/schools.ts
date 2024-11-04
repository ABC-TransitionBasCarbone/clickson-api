const { sql } = require("@vercel/postgres");
import { Application, NextFunction, Request, Response } from 'express';
import { handleErrors } from "../common";

module.exports = function (app: Application): void {
    app.put('/school', updateSchool);
    app.get('/school/:admin_username', getSchoolsById)

    // TODO Add multiples admin into Schools
    async function updateSchool(req: Request, res: Response, next: NextFunction) {
        const { id, state, name, town_name, postal_code, student_count, staff_count, establishment_year, adress, admin_username } = req.body
        try {
            const school = await sql.query(`
                update schools 
                set 
                    state = '${state}',
                    name = '${name}',
                    town_name = '${town_name}',
                    postal_code = '${postal_code}',
                    student_count = ${student_count},
                    staff_count = ${staff_count},
                    establishment_year = ${establishment_year},
                    adress = '${adress}'
                where id = '${id}';`);
                return res.status(200).json(school.rows[0]);
            } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function getSchoolsById(req: Request, res: Response, next: NextFunction) {
        try {
            const schoolAdmin = await sql.query(`
                select * from school_admins
                where LOWER(admin_username) LIKE LOWER('${req.params.admin_username}');
            `);
            const schools = await sql.query(`
                select * from schools 
                where id = '${schoolAdmin.rows[0].school_id}';
            `);
            return res.status(200).json(schools.rows[0]);
        } catch (error) {
            return handleErrors(next, error);
        }
    }
}
