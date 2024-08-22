import { join } from 'path';
import { readFileSync } from 'fs';
import { handleErrors } from '../common';

module.exports = function (app) {
    app.get('/report/file', (req, res, next) => {
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
    )
}