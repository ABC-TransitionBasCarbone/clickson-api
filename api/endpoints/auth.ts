const wordpressApiUrl = process.env.WORDPRESS_API_URL || "";
const usernameWordpress = process.env.WORDPRESS_APPLICATION_USERNAME;
const passwordWordpress = process.env.WORDPRESS_APPLICATION_PASSWORD;
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { Application, NextFunction, Request, Response } from 'express';
import { handleErrors, handleFetch } from "../common";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.set('Authorization', 'Basic ' + Buffer.from(usernameWordpress + ":" + passwordWordpress).toString('base64'));

module.exports = function (app: Application): void {

    app.post('/auth/login', login);
    app.post('/auth/sign-up', signUp);

    async function login(req: Request, res: Response, next: NextFunction) {
        const { username, password, rememberMe } = req.body;

        try {
            res.req.url = wordpressApiUrl + "/wp-json/jwt-auth/v1/token";
            const requestInit = {
                headers: myHeaders,
                method: "POST",
                body: JSON.stringify({
                    "username": username,
                    "password": password,
                    "rememberMe": rememberMe
                })
            } as RequestInit;
            const wordpressUser = await handleFetch(requestInit, res, next)
            if (wordpressUser) {
                const user = {
                    token: wordpressUser.token,
                    name: wordpressUser.user_display_name,
                    email: wordpressUser.user_email,
                }
                return res.status(200).send(user);
            }
            return res.status(403).send({ "error": "user not found" });

        } catch (error) {
            return handleErrors(next, error);
        }
    }

    async function signUp(req: Request, res: Response, next: NextFunction) {
        res.req.url = wordpressApiUrl + "/wp-json/wp/v2/users";
        const {
            email,
            firstName,
            lastName,
            password,
            role,
            state,
            schoolName,
            townName,
            postalCode,
        } = req.body;

        if (!schoolName) {
            return handleErrors(next, "Can you enter the name of the school ?");
        }

        // Check if user already admin of a school
        const schoolAdmin = await prisma.schoolAdmins.findFirst({
            where: {
                adminUsername: email.toLowerCase()
            }
        })

        if (!schoolAdmin) {
            // Check if school already exist
            let schoolFromBdd = await prisma.schools.findFirst({
                where: {
                    postalCode,
                    name: schoolName
                }
            })

            // The school doesn't exist so we will create it
            if (!schoolFromBdd) {
                try {
                    schoolFromBdd = await prisma.schools.create({
                        data: {
                            state,
                            name: schoolName,
                            townName,
                            postalCode
                        }
                    })
                } catch (error) {
                    return handleErrors(next, error);
                }
            }

            // Add user to admin school table
            try {
                await prisma.schoolAdmins.create({
                    data: {
                        schoolId: schoolFromBdd.id,
                        adminUsername: email.toLowerCase()
                    }
                })
            } catch (error) {
                return handleErrors(next, error);
            }
        }

        const body = {
            first_name: firstName,
            last_name: lastName,
            email: email.toLowerCase(),
            username: email.toLowerCase(),
            password: password,
            roles: role,
        }

        const requestInit = {
            headers: myHeaders,
            method: "POST",
            body: JSON.stringify(body)
        } as RequestInit;

        try {
            const json = await handleFetch(requestInit, res, next)
            return res.status(200).send(json);
        } catch (error) {
            return handleErrors(next, error);
        }
    }
}
