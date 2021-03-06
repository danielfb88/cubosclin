import { Application, Request, Response } from 'express';
import RegraHorarioRoutes from '../../modules/RegraHorario/routes';

class Routes {

    constructor() { }

    initRoutes(app: Application): void {
        app.route('/api/horario/all').get(RegraHorarioRoutes.getHorarios);
        app.route('/api/regrahorario/all').get(RegraHorarioRoutes.getAll);
        app.route('/api/regrahorario/:id').get(RegraHorarioRoutes.getById);
        app.route('/api/regrahorario/create').post(RegraHorarioRoutes.create);
        app.route('/api/regrahorario/:id/update').put(RegraHorarioRoutes.update);
        app.route('/api/regrahorario/:id/delete').delete(RegraHorarioRoutes.delete);
        app.route('/api/regrahorario/deleteAll').delete(RegraHorarioRoutes.deleteAll);
    }
}

export default new Routes();