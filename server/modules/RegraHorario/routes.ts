import { Request, Response } from 'express';
import RegraHorarioController from './controller';
let regraHorarioCtrl;

class RegraHorarioRoutes {
    
    constructor() {
        regraHorarioCtrl = new RegraHorarioController();
    }

    findAll(req: Request, res: Response) {
        return regraHorarioCtrl.findAll(req, res);
    }

    findOne(req: Request, res: Response) {
        return regraHorarioCtrl.findOne(req, res);
    }

    create(req: Request, res: Response) {
        return regraHorarioCtrl.create(req, res);
    }

    update(req: Request, res: Response) {
        return regraHorarioCtrl.update(req, res);
    }

    delete(req: Request, res: Response) {
        return regraHorarioCtrl.delete(req, res);
    }

}

export default RegraHorarioRoutes;