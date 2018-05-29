import * as express from 'express';
import { Application } from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import * as cookieParser from 'cookie-parser';
import swaggerify from './swagger';
import l from './logger';
import * as mongoose from 'mongoose';
import *  as SocketIO from 'socket.io';
import socketing from '../api/socketing/socketing';

const app = express();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(__dirname + '/../..');
    app.set('appPath', root + 'client');
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(`${root}/public`));
  }
  dbConnection(): ExpressServer {
    mongoose.connect(process.env.MONGODB_CONNECTION)
      .then(mong => l.info('connected'))
      .catch(err => l.danger('Db not connected'))
    return this;
  }

  router(routes: (app: Application) => void): ExpressServer {
    swaggerify(app, routes)
    return this;
  }
  listen(port: number = parseInt(process.env.PORT)): Application {
    const welcome = port => () => l.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${port}}`);
    const io = SocketIO(http.createServer(app).listen(port, welcome(port)));
    socketing(io);
    (app as any).io= io;
    return app;
  }
}