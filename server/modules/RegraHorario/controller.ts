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
            .then(arrRegraHorarioStored => {

                var currentDate = new Date();
                var currentDay = currentDate.getDate();
                var currentMonth = currentDate.getMonth(); //January is 0
                var currentYear = currentDate.getFullYear();

                var week = [
                    { i: 0, day: 'sun' },
                    { i: 1, day: 'mon' },
                    { i: 2, day: 'tue' },
                    { i: 3, day: 'wed' },
                    { i: 4, day: 'thu' },
                    { i: 5, day: 'fri' },
                    { i: 6, day: 'sat' }
                ];
                var arrAggreg: Array<any> = [];
                var arrReturn: Array<any> = [];

                var obj = {
                    day: null,
                    intervals: []
                };

                var cal = new c.Calendar();
                var arrWeeksOfMonth = cal.monthDays(currentYear, currentMonth);

                arrRegraHorarioStored.forEach(element => {

                    if (element.date != undefined && element.date != '') { // if date

                        obj = {
                            day: element.date,
                            intervals: element.intervals
                        };
                        arrAggreg.push(obj);


                    } else if (element.weekly.length > 0) { // if weekly

                        for (var i = 0; i < arrWeeksOfMonth.length; i++) {
                            for (var d = 0; d < element.weekly.length; d++) {
                                var choosedDay = element.weekly[d];

                                for (var w = 0; w < week.length; w++) {
                                    if (choosedDay == week[w].day) {
                                        var indexDay = week[w].i;

                                        var dateDay = arrWeeksOfMonth[i][indexDay];

                                        if (dateDay != 0) {
                                            obj = {
                                                day: `${dateDay}-${currentMonth + 1}-${currentYear}`,
                                                intervals: element.intervals
                                            };
                                            arrAggreg.push(obj);
                                        }
                                    }
                                }
                            }
                        }

                    } else if (element.daily) { // if daily
                        for (var i = 0; i < arrWeeksOfMonth.length; i++) {
                            for (var j = 0; j < arrWeeksOfMonth[i].length; j++) {

                                var dateDay = arrWeeksOfMonth[i][j];

                                if (dateDay != 0) {
                                    obj = {
                                        day: `${dateDay}-${currentMonth + 1}-${currentYear}`,
                                        intervals: element.intervals
                                    };
                                    arrAggreg.push(obj);
                                }
                            }
                        }
                    }
                });

                // verificando registro com os mesmos dias
                var arrDays: Array<string> = [];
                var arrDaysUnique: Array<string> = [];

                for (var i = 0; i < arrAggreg.length; i++) {
                    arrDays.push(arrAggreg[i].day);
                }

                arrDaysUnique = _.uniq(arrDays);

                for (var i = 0; i < arrDaysUnique.length; i++) {
                    var intervals: Array<any> = [];
                    var objReturn: any = {};
                    objReturn.day = arrDaysUnique[i];
                    objReturn.intervals = [];

                    for (var j = 0; j < arrAggreg.length; j++) {
                        
                        if (arrDaysUnique[i] == arrAggreg[j].day) {
                            objReturn.intervals = objReturn.intervals.concat(arrAggreg[j].intervals);
                        }

                    }

                    arrReturn.push(objReturn);
                }


                Handlers.onSuccess(res, arrReturn);
            })
            .catch(_.partial(Handlers.onError, res, 'Erro ao buscar os horários.'))
    }
}

export default new RegraHorarioController();