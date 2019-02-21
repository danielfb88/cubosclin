import { Application, Request, Response } from 'express';
import RegraHorarioRoutes from '../../modules/RegraHorario/routes';

class Routes {

    private router: RegraHorarioRoutes;

    constructor(app: Application) {
        this.router = new RegraHorarioRoutes();
        this.getRoutes(app);
    }

    getRoutes(app: Application): void {
        app.route('/api/regrahorario/all').get(this.router.getAll);
        app.route('/api/regrahorario/:id').get(this.router.getOne);
        app.route('/api/regrahorario/create').post(this.router.create);
        app.route('/api/regrahorario/:id/update').put(this.router.update);
        app.route('/api/regrahorario/:id/delete').delete(this.router.delete);
    }
}

export default Routes;