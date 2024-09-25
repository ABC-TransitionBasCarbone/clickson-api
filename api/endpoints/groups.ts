const { sql } = require("@vercel/postgres");
import { Application } from 'express';
import { handleErrors } from "../common";

module.exports = function (app: Application): void {
    /**
     * API : create group
     * @returns Group
     */
    app.post('/groups', async (req, res, next) => {
        const { id_school, teacher_username, name, year } = req.body
        try {
            const id_group = await sql`
                    insert into groups 
                    (id_school, teacher_username, name, year)
                    values (${id_school}, ${teacher_username}, ${name}, ${year})
                    returning id;
                `;
            return res.status(200).json("The group has been created. ID : " + id_group.rows[0].id);
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
}