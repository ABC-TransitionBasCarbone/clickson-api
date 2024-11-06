const { sql } = require("@vercel/postgres");
import { Application, NextFunction, Request, Response } from 'express';
import { handleErrors } from "../common";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

module.exports = function (app: Application): void {
    app.get('/languages/:language_code', getLanguage);

    async function getLanguage(req: Request, res: Response, next: NextFunction) {
        try {
            const language = await prisma.languages.findFirst({
                where: { languageCode: req.params.language_code }
            })

            if (!language) {
                return res.status(404).json({ message: "Language not found" });
            }

            return res.status(200).json(language.id);
        } catch (error) {
            return handleErrors(next, error);
        }
    }
}
