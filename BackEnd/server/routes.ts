import { Application } from 'express';
import * as path from 'path';
import users from './api/controllers/users/router'
export default function routes(app: Application): void {
  const root = path.normalize(__dirname + '/..');

  app.use('/api/v1/users', users);
  
};