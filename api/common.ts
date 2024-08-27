import { NextFunction } from "express";

export function handleErrors(next: NextFunction, error: any) {
    console.error('Fetch error:', error);
    next(error)
    return error as { requestInit: RequestInit; users: any; }
}
