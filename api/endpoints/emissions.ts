import { Application, NextFunction, Request, Response } from 'express';
import { handleErrors } from "../common";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

module.exports = function (app: Application): void {

    app.get('/emission/categories/:id_language', getEmissionCategories);
    app.get('/emission/sub-categories/:id_category', getEmissionSubCategoriesById);
    app.get('/emission-factors/:id_emission_sub_category', getEmissionFactors);
    app.put('/emission-factors', updateEmissionFactor);
    app.post('/emission-factors', createEmissionFactor);
    app.get('/emission-factors', getAllEmissionFactors);

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
                select: {
                    id: true,
                    label: true,
                    emissionSubCategories: {
                        include: {
                            emissionFactors: true
                        }
                    }
                }
            })

            return res.status(200).json(emissions);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function updateEmissionFactor(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, value, uncertainty, depreciationPeriod, label } = req.body;
            console.log("🚀 ~ updateEmissionFactor ~ req.body:", req.body)
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
            const { value, uncertainty, depreciationPeriod, label } = req.body;
            const emission = await prisma.emissionFactors.create({
                data: {
                    value: value,
                    uncertainty: uncertainty,
                    depreciationPeriod: depreciationPeriod,
                    label: label,
                    unit: req.body.unit,
                    type: req.body.type,
                    emissionSubCategory: {
                        connect: {
                            id: req.body.idEmissionSubCategory
                        }
                    },
                    language: {
                        connect: {
                            id: req.body.idLanguage
                        }
                    }
                }
            })

            return res.status(200).json(emission);
        } catch (error) {
            return handleErrors(next, error);
        }
    }
}
