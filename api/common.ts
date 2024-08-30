import { NextFunction } from "express";

export function handleErrors(next: NextFunction, error: any) {
    next(error)
    return error as { requestInit: RequestInit; users: any; }
}
