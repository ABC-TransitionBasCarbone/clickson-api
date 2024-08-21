
export function handleErrors(next: any, error: any) {
    console.error('Fetch error:', error);
    next(error)
    return {} as { requestInit: RequestInit; users: any; }
}
