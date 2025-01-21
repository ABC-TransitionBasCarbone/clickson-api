import { Application, NextFunction, Request, Response } from 'express';
import { handleErrors } from "../common";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

module.exports = function (app: Application): void {
    app.get('/emission/categories/:id_language', getEmissionCategories);
    app.put('/emission/categories', updateEmissionCategories);
    app.put('/emission/sub-categories', updateEmissionSubCategories);
    app.post('/emission/categories', createEmissionCategories);
    app.post('/emission/sub-categories', createEmissionSubCategories);
    app.get('/emission/sub-categories/:id_category', getEmissionSubCategoriesById);
    app.get('/emission-factors/:id_emission_sub_category', getEmissionFactors);
    app.put('/emission-factors', updateEmissionFactor);
    app.post('/emission-factors', createEmissionFactor);
    app.delete('/emission-factors', deleteEmissionFactor);
    app.get('/emission-factors', getAllEmissionFactors);

    async function createEmissionSubCategories(req: Request, res: Response, next: NextFunction) {
        const alreadyCreated = await prisma.emissionSubCategories.findFirst({
            where: {
                label: req.body.label,
                idLanguage: req.body.idLanguage
            }
        })

        if (alreadyCreated) {
            return res.status(400).json({ message: "Category already exists" });
        }

        try {
            const lastEmissionSubCategory = await prisma.emissionSubCategories.findFirst({
                orderBy: { id: 'desc' }
            });
            const id = lastEmissionSubCategory ? lastEmissionSubCategory.id + 1 : 1;


            const category = await prisma.emissionSubCategories.create({
                data: {
                    id: id,
                    label: req.body.label,
                    detail: "",
                    idEmissionCategory: req.body.idEmissionCategory,
                    idLanguage: req.body.idLanguage,

                }
            })
            return res.status(200).json(category);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function createEmissionCategories(req: Request, res: Response, next: NextFunction) {
        const alreadyCreated = await prisma.emissionCategories.findFirst({
            where: {
                label: req.body.label,
                idLanguage: req.body.idLanguage
            }
        })

        if (alreadyCreated) {
            return res.status(400).json({ message: "Category already exists" });
        }
        try {
            const lastEmissionCategory = await prisma.emissionCategories.findFirst({
                orderBy: { id: 'desc' }
            });
            const id = lastEmissionCategory ? lastEmissionCategory.id + 1 : 1;

            const category = await prisma.emissionCategories.create({
                data: {
                    id: id,
                    label: req.body.label,
                    detail: "",
                    idLanguage: req.body.idLanguage
                }
            })
            return res.status(200).json(category);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function updateEmissionSubCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const category = await prisma.emissionSubCategories.update({
                where: { id: req.body.id },
                data: {
                    label: req.body.label,
                    detail: req.body.detail,
                }
            })
            return res.status(200).json(category);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function updateEmissionCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const category = await prisma.emissionCategories.update({
                where: { id: req.body.id },
                data: {
                    label: req.body.label,
                    detail: req.body.detail,
                }
            })
            return res.status(200).json(category);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function getEmissionCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const emissionCategories = await prisma.emissionCategories.findMany({
                where: { idLanguage: Number(req.params.id_language) }
            })
            return res.status(200).json(emissionCategories);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function getEmissionSubCategoriesById(req: Request, res: Response, next: NextFunction) {
        try {
            const subCategories = await prisma.emissionSubCategories.findMany({
                where: { idEmissionCategory: Number(req.params.id_category) }
            })
            return res.status(200).json(subCategories);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function getEmissionFactors(req: Request, res: Response, next: NextFunction) {
        try {
            const emissions = await prisma.emissionFactors.findMany({
                where: {
                    idEmissionSubCategory: Number(req.params.id_emission_sub_category)
                }
            })

            return res.status(200).json(emissions);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function getAllEmissionFactors(req: Request, res: Response, next: NextFunction) {
        try {
            const emissions = await prisma.emissionCategories.findMany({
                include: {
                    emissionSubCategories: {
                        include: {
                            emissionFactors: true
                        },
                        orderBy: [
                            { id: 'asc' }
                        ]
                    }
                },
                orderBy: [
                    { idLanguage: 'asc' },
                    { id: 'asc' }
                ]
            })

            return res.status(200).json(emissions);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function deleteEmissionFactor(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;
            const emission = await prisma.emissionFactors.delete({ where: { id: id }, })

            return res.status(200).json(emission);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function updateEmissionFactor(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, value, uncertainty, depreciationPeriod, label } = req.body;
            const emission = await prisma.emissionFactors.update({
                where: { id: id },
                data: {
                    value: value,
                    uncertainty: uncertainty,
                    depreciationPeriod: depreciationPeriod,
                    label: label,
                    unit: req.body.unit,
                    type: req.body.type,
                }
            })

            return res.status(200).json(emission);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function createEmissionFactor(req: Request, res: Response, next: NextFunction) {
        try {
            const lastEmissionFactor = await prisma.emissionFactors.findFirst({
                orderBy: { id: 'desc' }
            });
            const id = lastEmissionFactor ? lastEmissionFactor.id + 1 : 1;

            const emission = await prisma.emissionFactors.create({
                data: {
                    id: id,
                    value: req.body.value,
                    uncertainty: req.body.uncertainty,
                    depreciationPeriod: req.body.depreciationPeriod,
                    label: req.body.label,
                    unit: req.body.unit,
                    type: req.body.type,
                    idEmissionSubCategory: req.body.idEmissionSubCategory,
                    idLanguage: req.body.idLanguage
                }
            })

            return res.status(200).json(emission);
        } catch (error) {
            return handleErrors(next, error);
        }
    }
}
