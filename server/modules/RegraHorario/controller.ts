import { Request, Response } from 'express';
import * as HTTPStatus from 'http-status';
import * as _ from 'lodash';
import RegraHorarioService from './service';
import Handlers from '../../api/responses/handlers';

class RegraHorarioController {

    constructor() { }

    getAll(req: Request, res: Response) {
        RegraHorarioService.getAll()
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao buscar todas as Regras de Horario.'))
    }

    getById(req: Request, res: Response) {
        const regraHorarioId = parseInt(req.params.id);

        RegraHorarioService.getById(regraHorarioId)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Regra de Horario não encontrada.'))
    }

    create(req: Request, res: Response) {
        RegraHorarioService.create(req.body)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao inserir nova Regra de Horario.'))
    }

    update(req: Request, res: Response) {
        const regraHorarioId = parseInt(req.params.id);
        const props = req.body;

        RegraHorarioService.update(regraHorarioId, props)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Falha ao atualizar Regra de Horario.'))
    }

    delete(req: Request, res: Response) {
        const regraHorarioId = parseInt(req.params.id);

        RegraHorarioService.delete(regraHorarioId)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao deletar Regra de Horario.'))
    }
}

export default RegraHorarioController;