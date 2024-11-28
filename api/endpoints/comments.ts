import { Application, NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import { handleErrors } from "../common";

const prisma = new PrismaClient()

module.exports = function (app: Application): void {
    app.post('/comments', createComment);
    app.delete('/comments', deleteComment);

    async function createComment(req: Request, res: Response, next: NextFunction) {
        const { idEmissionSubCategory, comment } = req.body
        try {
            const commentToReturn = await prisma.comments.create({
                data: { idEmissionSubCategory, comment }
            })
            return res.status(200).json(commentToReturn);
        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function deleteComment(req: Request, res: Response, next: NextFunction) {
        const { id } = req.body
        try {
            const comment = await prisma.comments.delete({ where: { id } })

            return res.status(200).json(comment);
        } catch (error) {
            return handleErrors(next, error);
        }
    }


}
