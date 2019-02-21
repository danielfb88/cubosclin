import { Request, Response } from 'express';
import * as HTTPStatus from 'http-status';
import RegraHorario from './service';

class RegraHorarioController {
    private RegraHorarioService: RegraHorario;
    constructor() {
        this.RegraHorarioService = new RegraHorario();
    }

    getAll(req: Request, res: Response) {
        this.RegraHorarioService
            .getAll()
            .then(data => {
                res.status(HTTPStatus.OK).json({ payload: data })
            })
            .catch(err => {
                res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ payload: 'Erro ao buscar todas as Regras de Horário' })
            })
    }

    getById(req: Request, res: Response) {
        const regraHorarioId = parseInt(req.params.id);

        this.RegraHorarioService.getById(regraHorarioId)
            .then(data => {
                res.status(HTTPStatus.OK).json({ payload: data });
            })
            .catch(err => {
                res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ payload: 'Erro ao buscar a Regra de Horário' })
            })
    }

    create(req: Request, res: Response) {
        this.RegraHorarioService
            .create(req.body)
            .then(data => {
                res.status(HTTPStatus.OK).json({ payload: data });
            })
            .catch(err => {
                res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ payload: 'Erro ao cadastrar nova Regra de Horário' })
            })
    }

    update(req: Request, res: Response) {
        const regraHorarioId = parseInt(req.params.id);
        const props = req.body;

        this.RegraHorarioService.update(regraHorarioId, props)
            .then(data => {
                res.status(HTTPStatus.OK).json({
                    payload: data
                });
            })
            .catch(err => {
                res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ payload: 'Erro ao atualizar Regra de Horário' })
            })
    }

    delete(req: Request, res: Response) {
        const regraHorarioId = parseInt(req.params.id);

        this.RegraHorarioService.delete(regraHorarioId)
            .then(data => {
                res.status(HTTPStatus.OK).json({
                    payload: data
                });
            })
            .catch(err => {
                res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ payload: 'Erro ao deletar Regra de Horário' })
            })
    }
}

export default RegraHorarioController;