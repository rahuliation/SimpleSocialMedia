import { Application } from 'express';
import * as path from 'path';
import examplesRouter from './api/controllers/examples/router'
export default function routes(app: Application): void {
  const root = path.normalize(__dirname + '/..');

  app.use('/api/v1/examples', examplesRouter);
  
};