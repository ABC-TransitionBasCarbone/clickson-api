import { join } from 'path';
import { readFileSync } from 'fs';
import { handleErrors } from '../common';
import { Application, NextFunction, Request, Response } from 'express';
import fs from 'fs'

module.exports = function (app: Application): void {
  app.put('/report/file', getFiles);

  async function getFiles(req: Request, res: Response, next: NextFunction) {
    const filePath = join(process.cwd(), '/api/public', 'clickson.xlsx');
    try {
      if (!fs.existsSync(filePath)) {
        console.error('File not found: ', filePath);
        return res.status(404).send('File not found');
      }

      const fileContents = readFileSync(filePath);

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=clickson.xlsx');

      res.send(fileContents);
    } catch (error) {
      console.error('Error reading file: ', error);
      return handleErrors(next, error);
    }
  }
}
