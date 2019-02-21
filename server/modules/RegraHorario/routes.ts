import { Request, Response } from 'express';
import RegraHorarioController from './controller';

class RegraHorarioRoutes {

    constructor() { }

    getAll(req: Request, res: Response) {
        return RegraHorarioController.getAll(req, res);
    }

    getById(req: Request, res: Response) {
        return RegraHorarioController.getById(req, res);
    }

    create(req: Request, res: Response) {
        return RegraHorarioController.create(req, res);
    }

    update(req: Request, res: Response) {
        return RegraHorarioController.update(req, res);
    }

    delete(req: Request, res: Response) {
        return RegraHorarioController.delete(req, res);
    }

}

export default RegraHorarioRoutes;