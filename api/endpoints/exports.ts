import { join } from 'path';
import { readFileSync } from 'fs';
import { handleErrors } from '../common';
import { Application, NextFunction, Request, Response } from 'express';


module.exports = function (app: Application): void {
  app.put('/report/file', async (req: Request, res: Response, next: NextFunction) => getFiles(req, res, next));

  async function getFiles(req: Request, res: Response, next: NextFunction) {

    const filePath = join(process.cwd(), '/api/public/files/clickson.xlsx');
    try {
      const fileContents = readFileSync(filePath);

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=clickson.xlsx');

      res.send(fileContents);
    } catch (error) {
      console.error('Error reading file:', error);
      return handleErrors(next, error);
    }
  }
}
