import { testdouble, expect } from './config/helpers';
import RegraHorario from '../../server/modules/RegraHorario/service';
import FileManager from '../../server/api/fileManager';

describe('Testes Unitários do Service', () => {

    const regraHorario1 = {
        date: '25-11-2018',
        weekly: [],
        daily: false,
        intervals: [
            {
                start: "10:40",
                end: "11:00"
            },
            {
                start: "11:20",
                end: "12:00"
            },
        ]
    }

    const regraHorario2 = {
        date: null,
        weekly: ['mon', 'thu', 'sat'],
        daily: false,
        intervals: [
            {
                start: "13:00",
                end: "13:30"
            },
            {
                start: "14:00",
                end: "14:30"
            },
        ]
    }

    const regraHorario3 = {
        date: null,
        weekly: [],
        daily: true,
        intervals: [
            {
                start: "20:00",
                end: "21:00"
            },
            {
                start: "22:00",
                end: "22:30"
            },
        ]
    }

    beforeEach((done) => {
        FileManager.clean();
        done();
    });

    describe('Método Create', () => {
        it('Deve criar uma nova Regra de Horário', done => {
            RegraHorario.create(regraHorario1)
                .then(data => {
                    expect(data.id).to.equal(0);
                    done();
                })
        });
    });

    describe('Método Update', () => {
        it('Deve atualizar uma Regra de Horário', () => {
            const regraHorario_updated = {
                date: '08-02-1988',
                weekly: [],
                daily: true,
                intervals: [{ start: '10:20', end: '11:40' }]
            }

            FileManager.save(regraHorario1)
                .then(() => {
                    FileManager.save(regraHorario2)
                        .then(() => {
                            FileManager.save(regraHorario3)
                                .then(() => {

                                    RegraHorario.update(1, regraHorario_updated)
                                        .then(data => {
                                            expect(data[0].date).to.be.equal(regraHorario_updated.date)
                                        })

                                });
                        });
                });

        });
    });

    describe('Método getById', () => {
        it('Deve retornar um Regra de Horário de acordo com o ID passado', done => {

            FileManager.save(regraHorario1)
                .then(() => {
                    FileManager.save(regraHorario2)
                        .then(() => {
                            FileManager.save(regraHorario3)
                                .then(() => {
                                    FileManager.getById(0)
                                        .then(data => {
                                            expect(data.id).to.equal(0);
                                            done();
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        })
                                });
                        });
                });
        });
    });

    describe('Método Get Regras de Horários', () => {
        it('Deve retornar uma lista com todas as Regras de Horários', () => {

            FileManager.save(regraHorario1)
                .then(() => {
                    FileManager.save(regraHorario2)
                        .then(() => {
                            FileManager.save(regraHorario3)
                                .then(() => {
                                    
                                    RegraHorario.getAll().then(data => {
                                        expect(data).to.be.an('array');
                                    })

                                });
                        });
                });

        });
    });

})