import * as express from 'express';
import { Application } from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import Routes from './routes/routes';
import Handlers from './responses/handlers';

class Api {
    public express: Application;

    constructor() {
        this.express = express();
        this.middleware();
    }

    middleware(): void {
        this.express.use(morgan('dev'));
        this.express.use(bodyParser.urlencoded( { extended: true } ));
        this.express.use(bodyParser.json());
        this.express.use(Handlers.errorHandlerApi);
        this.router(this.express);
    }

    private router(app: Application): void {
        Routes.initRoutes(app);
    }
}

export default new Api().express;