import express, { Application } from 'express';
import morgan from 'morgan';
import userAccountRoutes from '../infrastucture/routes/user.routes';
import tranfersRoutes from '../infrastucture/routes/transfers.routes';
import conectarDB from '../dbConfig/mongo';

export default class Server {

  private app: Application;
  private port: string;
  paths:{ [key: string]: string };

  constructor() {
    this.app = express();
    this.port = '3000';

    this.paths = {
      userAccount: '/api/userAccount',
      transfers: '/api/transfers',
      docs: '/api/docs'
    };

    this.middlewares();
    this.conectDB();
    this.routes();
  }

  middlewares() {
    this.app.use( express.json() );
    this.app.use(morgan('dev'));
  }

  async conectDB() {
    await conectarDB();
  }

  listen() {
    this.app.listen( this.port, () => {
      console.log('Servidor corriendo en:', this.port);
    });
  }

  routes() {
    this.app.use(this.paths.userAccount, userAccountRoutes);
    this.app.use(this.paths.transfers, tranfersRoutes);
  }

}
