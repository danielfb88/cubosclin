import { Request, Response } from 'express';
import * as HTTPStatus from 'http-status';
import * as _ from 'lodash';
import RegraHorario from './service';
import Handlers from '../../api/responses/handlers';
import * as date from 'date-and-time';
import * as c from 'calendar';

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

    getHorarios(req: Request, res: Response) {
        RegraHorario.getAll()
            .then(arr => {

                var currentDate = new Date();
                var currentDay = currentDate.getDate();
                var currentMonth = currentDate.getMonth(); //January is 0
                var currentYear = currentDate.getFullYear();

                var week = [
                    { i: 0, day: 'mon' },
                    { i: 1, day: 'tue' },
                    { i: 2, day: 'wed' },
                    { i: 3, day: 'thu' },
                    { i: 4, day: 'fri' },
                    { i: 5, day: 'sat' },
                    { i: 6, day: 'sun' }
                ];
                var arrReturn: Array<any> = [];
                var obj = {
                    day: new Date(),
                    intervals: []
                };

                var cal = new c.Calendar();
                var arrWeeks = cal.monthDays(currentYear, currentMonth);

                arr.forEach(element => {
                    if (element.date != undefined || element.date != '') {
                        var elementDate: Date = date.parse('02-01-2015', 'DD-MM-YYYY');

                        obj = {
                            day: new Date(),
                            intervals: []
                        };
                        arrReturn.push(obj);

                    } else if (element.weekly.length > 0) {
                        for (var i = 0; i < arrWeeks.length; i++) {
                            for (var d = 0; d < element.weekly.length; d++) {
                                var day = element.weekly[d];

                                for (var w = 0; w < week.length; w++) {
                                    if (day == week[w].day) {
                                        var index = week[w].i;

                                        var dateDay = arrWeeks[i][index];

                                        if (dateDay != 0) {
                                            obj = {
                                                day: date.parse(`${dateDay}-${currentMonth}-${currentYear}`, 'DD-MM-YYYY'),
                                                intervals: element.intervals
                                            };
                                            arrReturn.push(obj);
                                        }
                                    }
                                }
                            }
                        }

                    } else if (element.daily) {
                        for (var i = 0; i < arrWeeks.length; i++) {
                            for (var d = 0; d < element.weekly.length; d++) {

                                for (var w = 0; w < week.length; w++) {
                                    var dateDay = arrWeeks[i][index];

                                    if (dateDay != 0) {
                                        obj = {
                                            day: date.parse(`${dateDay}-${currentMonth}-${currentYear}`, 'DD-MM-YYYY'),
                                            intervals: element.intervals
                                        };
                                        arrReturn.push(obj);
                                    }
                                }
                            }
                        }
                    }
                });

                Handlers.onSuccess(res, arrReturn);
            })
            .catch(_.partial(Handlers.onError, res, 'Erro ao buscar os horários.'))
    }
}

export default new RegraHorarioController();