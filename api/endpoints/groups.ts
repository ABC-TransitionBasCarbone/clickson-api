const { sql } = require("@vercel/postgres");
import { Application, NextFunction, Request, Response } from 'express';
import { handleErrors } from "../common";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

module.exports = function (app: Application): void {
    app.post('/groups', createGroup);
    app.put('/groups', updateGroup);
    app.get('/groups/:teacher_username', getTeacherGroups);

    async function createGroup(req: Request, res: Response, next: NextFunction) {
        const { idSchool, teacherUsername, name, year } = req.body
        try {
            const groups = await prisma.groups.create({
                data: { idSchool, teacherUsername, name, year }
            })
            return res.status(200).json(groups);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function updateGroup(req: Request, res: Response, next: NextFunction) {
        const { id, idSchool, teacherUsername, name, year, archived, deleted } = req.body
        try {
            await prisma.groups.update({
                where: { id: id },
                data: {
                    idSchool,
                    teacherUsername,
                    name,
                    year,
                    archived,
                    deleted,
                    updatedAt: new Date()
                }
            })
            return res.status(200).json(id);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function getTeacherGroups(req: Request, res: Response, next: NextFunction) {
        try {
            const groups = prisma.groups.findMany({
                where: { teacherUsername: req.params.teacher_username }
            })

            return res.status(200).json(groups);
        } catch (error) {
            return handleErrors(next, error);
        }
    }
}
