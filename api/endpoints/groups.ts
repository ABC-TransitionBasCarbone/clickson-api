import { Application, NextFunction, Request, Response } from 'express';
import { handleErrors } from "../common";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

module.exports = function (app: Application): void {
    app.post('/groups', createGroup);
    app.put('/groups', updateGroup);
    app.get('/groups/:id_group', getGroup);

    async function createGroup(req: Request, res: Response, next: NextFunction) {
        const { idSchool, idSessionStudent, name, year } = req.body
        try {
            const groups = await prisma.groups.create({
                data: { idSchool, idSessionStudent, name, year }
            })
            return res.status(200).json(groups);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function updateGroup(req: Request, res: Response, next: NextFunction) {
        const { id, idSchool, name, year, archived, deleted, rights } = req.body
        try {
            const group = await prisma.groups.update({
                where: { id: id },
                data: {
                    idSchool,
                    name,
                    year,
                    archived,
                    deleted,
                    rights,
                    updatedAt: new Date()
                }
            })
            return res.status(200).json(group);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function getGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const group = await prisma.groups.findFirstOrThrow({
                where: {
                    id: req.params.id_group
                },
                select: {
                    id: true,
                    idSessionStudent: true,
                    sessionStudent: {
                        select: {
                            id: true,
                            name: true,
                            sessionEmissionCategories: {
                                select: {
                                    id: true,
                                    idSessionStudent: true,
                                    idEmissionCategory: true,
                                    sessionEmissionSubCategories: {
                                        select: {
                                            sessionEmissions: {
                                                select: {
                                                    value: true,
                                                }
                                            }
                                        }
                                    },
                                    emissionCategory: {
                                        select: {
                                            label: true,
                                            detail: true
                                        }
                                    }
                                }
                            }
                        }

                    }
                }
            })
            
            return res.status(200).json(group);
        } catch (error) {
            return handleErrors(next, error);
        }
    }
}
