const { sql } = require("@vercel/postgres");
import { Application, Request, Response } from 'express';

interface EmissionCategory {
    label: string;
}


export default function (app: Application): void {

    app.get('/', async (req: Request, res: Response) => {
        try {
            const emissionCategories = await sql<EmissionCategory[]>`SELECT * FROM emission_categories;`;
            return res.status(200).json({ emissionCategories: emissionCategories.rows.map((e: EmissionCategory) => e.label) });
        } catch (error) {
            console.error('Error fetching emission categories:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });

}