
export function handleErrors(next: any, error: any) {
    console.error('Fetch error:', error);
    next(error)
    return error as { requestInit: RequestInit; users: any; }
}
