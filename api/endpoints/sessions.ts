import { Application, NextFunction, Request, Response } from 'express';
import { handleErrors } from "../common";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

module.exports = function (app: Application): void {
    app.put('/sessions/:id', updateSessionsById);
    app.post('/sessions', createSession)
    app.put('/sessions', updateSession)
    app.get('/sessions/:id', getSessionById)
    app.get('/sessions/school/:id_school', getSessionByIdSchool)
    app.get('/session-categories/:id_session_student', getSessionCategoriesByIdSessionStudent)
    app.get('/session-sub-categories/:id_session_emission_category', getSessionSubCategoriesByIdSessionEmissionCategorie)
    app.post('/session-emission', createSessionEmission)
    app.delete('/session-emission', deleteSessionEmission)
    app.get('/session-emission/:id_session_emission_sub_category', getSessionEmissionByIdSubCategorie)

    async function updateSessionsById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = await prisma.sessionStudents.update({
                where: {
                    id: req.params.id,
                    updatedAt: new Date()
                },
                data: { deleted: true }
            })

            return res.status(200).json(id);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    /**
     * API: create student session
     * create session emission categories associated
     * create session emission sub categories associated
     * @returns Session
     */
    async function createSession(req: Request, res: Response, next: NextFunction) {
        try {
            const { idSchool, name, year } = req.body

            const session = await prisma.sessionStudents.create({ data: { idSchool, name, year } })

            // Creation of student Sessions Emission Categories for each categories
            const emissionCategories = await prisma.emissionCategories.findMany({ where: { idLanguage: 1 } })

            await prisma.sessionEmissionCategories.createMany({
                data: emissionCategories.map(categorie => (
                    {
                        idSessionStudent: session.id,
                        idEmissionCategory: categorie.id
                    }))
            })

            const sessionEmissionCategories = await prisma.sessionEmissionCategories.findMany(
                {
                    where: { idSessionStudent: session.id }
                })

            // Creation of Sessions Emissions Sub Categories for each sub categories
            const emissionSubCategories = await prisma.emissionSubCategories.findMany({ where: { idLanguage: 1 } })

            const sessionEmissionSubCategoriesMap =
                emissionSubCategories.map(subCategorie => ({
                    idSessionEmissionCategory: sessionEmissionCategories.find(categorie =>
                        categorie.idEmissionCategory === subCategorie.idEmissionCategory)?.id || "",
                    idEmissionSubCategory: subCategorie.id
                }))

            await prisma.sessionEmissionSubCategories.createMany({ data: sessionEmissionSubCategoriesMap })

            return res.status(200).json(session);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function updateSession(req: Request, res: Response, next: NextFunction) {
        const { id, idSchool, name, year, archived, deleted, locked } = req.body
        try {
            const session = await prisma.sessionStudents.update({
                where: { id },
                data: {
                    idSchool,
                    name,
                    year,
                    archived,
                    deleted,
                    locked,
                    updatedAt: new Date()
                }
            })

            return res.status(200).json(session);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function getSessionById(req: Request, res: Response, next: NextFunction) {
        try {
            const sessions = await prisma.sessionStudents.findMany({ where: { id: req.params.id } });

            return res.status(200).json(sessions);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function getSessionByIdSchool(req: Request, res: Response, next: NextFunction) {
        try {
            const sessions = await prisma.sessionStudents.findMany(
                {
                    where: {
                        idSchool: req.params.id_school
                    },
                    include: {
                        groups: {
                            where: {
                                deleted: false
                            }
                        },
                    }
                });

            return res.status(200).json(sessions);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function getSessionCategoriesByIdSessionStudent(req: Request, res: Response, next: NextFunction) {
        try {
            const sessionCategories = await prisma.sessionEmissionCategories.findMany({
                where: { id: req.params.id_session_student }
            });

            return res.status(200).json(sessionCategories);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function getSessionSubCategoriesByIdSessionEmissionCategorie(req: Request, res: Response, next: NextFunction) {
        try {
            const sessionSubCategories = await prisma.sessionEmissionSubCategories.findMany(
                {
                    where: {
                        idSessionEmissionCategory: req.params.id_session_emission_category
                    },
                    select: {
                        id: true,
                        idEmissionSubCategory: true,
                        comments: true,
                        emissionSubCategory: {
                            select: {
                                label: true,
                                detail: true,
                                emissionFactors: true
                            }
                        },
                        sessionEmissions: {
                            include: {
                                emissionFactor: true
                            },
                        }
                    },
                })

            return res.status(200).json(sessionSubCategories);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function createSessionEmission(req: Request, res: Response, next: NextFunction) {
        const { idSessionEmissionSubCategory, idEmissionFactor, value } = req.body
        try {
            const sessionEmission = await prisma.sessionEmissions.create(
                {
                    data:
                    {
                        idSessionEmissionSubCategory,
                        idEmissionFactor,
                        value
                    }
                })

            return res.status(200).json(sessionEmission);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function deleteSessionEmission(req: Request, res: Response, next: NextFunction) {
        const { id } = req.body
        try {
            const sessionEmission = await prisma.sessionEmissions.delete({ where: { id } })

            return res.status(200).json(sessionEmission);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function getSessionEmissionByIdSubCategorie(req: Request, res: Response, next: NextFunction) {
        try {
            const idSessionEmissionSubCategorie = await prisma.sessionEmissionSubCategories.findMany(
                { where: { id: req.params.id_session_emission_sub_category } });

            return res.status(200).json(idSessionEmissionSubCategorie);
        } catch (error) {
            return handleErrors(next, error);
        }
    }
}
