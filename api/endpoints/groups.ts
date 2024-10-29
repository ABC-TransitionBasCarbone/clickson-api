const { sql } = require("@vercel/postgres");
import { Application, NextFunction, Request, Response } from 'express';
import { handleErrors } from "../common";

module.exports = function (app: Application): void {
    app.post('/groups', createGroup);
    app.put('/groups', updateGroup);
    app.get('/groups/:teacher_username', getTeacherGroups);

    async function createGroup(req: Request, res: Response, next: NextFunction) {
        const { id_school, teacher_username, name, year } = req.body
        try {
            const groups = await sql`
                    insert into groups 
                    (id_school, teacher_username, name, year)
                    values (${id_school}, ${teacher_username}, ${name}, ${year})
                    returning *;
                `;
            return res.status(200).json(groups.rows[0]);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function updateGroup(req: Request, res: Response, next: NextFunction) {
        const { id, id_school, teacher_username, name, year, archived, deleted } = req.body
        try {
            await sql.query(`
                    update groups 
                    set
                        id_school='${id_school}',
                        teacher_username='${teacher_username}',
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
    }

    async function getTeacherGroups(req: Request, res: Response, next: NextFunction) {
        try {
            const sessions = await sql`
                select * from groups where teacher_username=${req.params.teacher_username}`;
            return res.status(200).json(sessions.rows);
        } catch (error) {
            return handleErrors(next, error);
        }
    }
}
