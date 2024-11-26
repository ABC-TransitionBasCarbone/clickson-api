import { Application, NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import { handleErrors } from "../common";

const prisma = new PrismaClient()

module.exports = function (app: Application): void {
    app.post('/comments', createComment);

    async function createComment(req: Request, res: Response, next: NextFunction) {
        const { idEmissionSubCategory, comment } = req.body
        try {
            const comments = await prisma.comments.create({
                data: { idEmissionSubCategory, comment }
            })
            return res.status(200).json(comments);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

}
