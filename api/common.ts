


export function handle500errors(error: any, res: any) {
    console.error('Fetch error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
}
