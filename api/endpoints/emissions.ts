import { Application, NextFunction, Request, Response } from 'express';
import { handleErrors } from "../common";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

module.exports = function (app: Application): void {

    app.get('/emission/categories/:id_language', getEmissionCategories);
    app.get('/emission/sub-categories/:id_category', getEmissionSubCategoriesById);
    app.get('/emission-factors/:id_emission_sub_category', getEmissionFactors);

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
}
