import { Request, Response } from 'express';
import * as HTTPStatus from 'http-status';
import * as _ from 'lodash';
import RegraHorario from './service';
import Handlers from '../../api/responses/handlers';

class RegraHorarioController {

    constructor() { }

    getAll(req: Request, res: Response) {
        RegraHorario.getAll()
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao buscar todas as Regras de Horario.'))
    }

    getById(req: Request, res: Response) {
        const regraHorarioId = parseInt(req.params.id);

        RegraHorario.getById(regraHorarioId)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Regra de Horario não encontrada.'))
    }

    create(req: Request, res: Response) {
        RegraHorario.create(req.body)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao inserir nova Regra de Horario.'))
    }

    update(req: Request, res: Response) {
        const regraHorarioId = parseInt(req.params.id);

        RegraHorario.update(regraHorarioId, req.body)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Falha ao atualizar Regra de Horario.'))
    }

    delete(req: Request, res: Response) {
        const regraHorarioId = parseInt(req.params.id);

        RegraHorario.delete(regraHorarioId)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao deletar Regra de Horario.'))
    }

    deleteAll(req: Request, res: Response) {
        RegraHorario.deleteAll()
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao deletar todos os objetos.'))
    }

    // getHorarios(req: Request, res: Response) {
    //     RegraHorario.getAll()
    //         .then(arr => {
    //             var objReturn = {};

    //             arr.forEach(element => {

    //             });

    //             _.partial(Handlers.onSuccess, res)
    //         })
    //         .catch(_.partial(Handlers.onError, res, 'Erro ao buscar os horários.'))
    // }
}

export default new RegraHorarioController();