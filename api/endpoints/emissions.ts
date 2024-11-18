import { Application, NextFunction, Request, Response } from 'express';
import { handleErrors } from "../common";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

module.exports = function (app: Application): void {

    app.get('/emission/categories/:id_language', getEmissionCategoriesByLanguageId);
    app.get('/emission/sub-categories/:id_category', getEmissionSubCategoriesByCategoryId);
    app.post('/emission/sub-categories', getEmissionSubCategoriesByCategoryIds);
    app.get('/emission-factors/:id_emission_sub_category', getEmissionFactorsBySubCategorieId);

    async function getEmissionCategoriesByLanguageId(req: Request, res: Response, next: NextFunction) {
        try {
            const emissionCategories = await prisma.emissionCategories.findMany({
                where: { idLanguage: Number(req.params.id_language) }
            })

            return res.status(200).json(emissionCategories);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function getEmissionSubCategoriesByCategoryId(req: Request, res: Response, next: NextFunction) {
        try {
            const sub_categories = await prisma.emissionSubCategories.findMany({
                where: { idEmissionCategory: Number(req.params.id_category) }
            })

            return res.status(200).json(sub_categories);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function getEmissionSubCategoriesByCategoryIds(req: Request, res: Response, next: NextFunction) {
        try {

            const subCategories = prisma.emissionSubCategories.findMany({
                where: {
                    id: { in: req.body },
                },
            })
            return res.status(200).json(subCategories);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function getEmissionFactorsBySubCategorieId(req: Request, res: Response, next: NextFunction) {
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
}
