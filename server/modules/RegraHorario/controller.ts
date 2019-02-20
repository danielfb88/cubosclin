import { Request, Response } from 'express';

class RegraHorarioController {
    constructor() { }

    findAll(req: Request, res: Response) {
        res.status(200).json({
            message: 'OK'
        })
    }

    findOne(req: Request, res: Response) {
        res.status(200).json({
            message: 'OK'
        })
    }

    create(req: Request, res: Response) {
        res.status(200).json({
            message: 'OK'
        })
    }

    update(req: Request, res: Response) {
        res.status(200).json({
            message: 'OK'
        })
    }

    delete(req: Request, res: Response) {
        res.status(200).json({
            message: 'OK'
        })
    }
}

export default RegraHorarioController;