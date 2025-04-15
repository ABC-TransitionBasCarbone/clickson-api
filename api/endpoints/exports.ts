import { join } from 'path';
import { readFileSync } from 'fs';
import { handleErrors } from '../common';
import { Application, NextFunction, Request, Response } from 'express';
import fs from 'fs'

module.exports = function (app: Application): void {
  app.put('/report/file', getFiles);

  async function getFiles(req: Request, res: Response, next: NextFunction) {
    console.log('Request to /report/file received');
    console.log('Request body: ', req.body);
    console.log('Request query: ', req.query);
    console.log('Request params: ', req.params);
    console.log('Request headers: ', req.headers);
    console.log('Request method: ', req.method);
    console.log('Request URL: ', req.url);
    console.log('Request IP: ', req.ip);

    const filePath = join(process.cwd(), '../public/clickson.xlsx');
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
