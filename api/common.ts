import { NextFunction, Response } from "express";

export function handleErrors(next: NextFunction, error: any) {
    next(error)
    return error as { requestInit: RequestInit; users: any; }
}

export async function handleFetch(requestOptions: RequestInit, res: Response, next: NextFunction) {
    try {
        const response = await fetch(res.req.url, requestOptions);
        if (!response.ok) {
            const errorBody = await response.json();
            return res.status(403).send({ errors: errorBody });
        }

        return response.json();
    }
    catch (errors) {
        return next(errors);

    }
}
