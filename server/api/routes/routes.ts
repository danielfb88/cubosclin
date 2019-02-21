import { Application, Request, Response } from 'express';
import RegraHorarioRoutes from '../../modules/RegraHorario/routes';

class Routes {

    private router: RegraHorarioRoutes;

    constructor() {
        this.router = new RegraHorarioRoutes();
    }

    initRoutes(app: Application): void {
        app.route('/api/regrahorario/all').get(this.router.getAll);
        app.route('/api/regrahorario/:id').get(this.router.getById);
        app.route('/api/regrahorario/create').post(this.router.create);
        app.route('/api/regrahorario/:id/update').put(this.router.update);
        app.route('/api/regrahorario/:id/delete').delete(this.router.delete);
    }
}

export default new Routes();