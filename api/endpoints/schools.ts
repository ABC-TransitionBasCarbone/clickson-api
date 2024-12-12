import { Application, NextFunction, Request, Response } from 'express';
import { handleErrors } from "../common";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

module.exports = function (app: Application): void {
    app.put('/school', updateSchool);
    app.get('/school/:admin_username', getSchoolByAdmin)
    app.get('/school', getSchool)

    async function updateSchool(req: Request, res: Response, next: NextFunction) {
        const {
            id,
            state,
            name,
            town: townName,
            postalCode,
            studentCount,
            staffCount,
            establishmentYear,
            adress
        } = req.body
        try {
            const school = await prisma.schools.update({
                where: { id },
                data: {
                    state,
                    name,
                    townName,
                    postalCode,
                    studentCount,
                    staffCount,
                    establishmentYear,
                    adress,
                    updatedAt: new Date()
                }
            })

            return res.status(200).json(school);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function getSchoolByAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const schools = await prisma.schools.findFirstOrThrow({
                where: {
                    schoolAdmins: {
                        some: {
                            adminUsername: req.params.admin_username
                        }
                    }
                }
            })

            return res.status(200).json(schools);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function getSchool(req: Request, res: Response, next: NextFunction) {
        try {
            const school = await prisma.schools.findUnique({
                where: {
                    id: req.query.id as string
                }
            })

            return res.status(200).json(school);
        } catch (error) {
            return handleErrors(next, error);
        }
    }
}
