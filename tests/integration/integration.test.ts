import { app, request, expect } from './config/helpers';
import * as HTTPStatus from 'http-status';
import FileManager from '../../server/api/fileManager';
import RegraHorario from '../../server/modules/RegraHorario/service';

describe('Testes de integração', () => {

    'use strict';
    const config = require('../../server/config/env/config')();

    const regraHorario1 = {
        id: 1,
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
        id: 2,
        date: '',
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
        id: 3,
        date: '',
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

    describe('GET /api/regrahorario/all', () => {
        it('Deve retornar um array com todos os objetos regraHorario', done => {

            FileManager.save(regraHorario1)
                .then(() => {
                    FileManager.save(regraHorario2)
                        .then(() => {
                            FileManager.save(regraHorario3)
                                .then(() => {

                                    request(app)
                                        .get('/api/regrahorario/all')
                                        .end((error, res) => {
                                            expect(res.status).to.equal(HTTPStatus.OK);
                                            expect(res.body.payload.length).to.equal(3);
                                            done(error);
                                        })

                                });
                        });
                });

        });
    });

    describe('GET /api/regrahorario/:id', () => {
        it('Deve retornar apenas o objeto solicitado', done => {

            FileManager.save(regraHorario1)
                .then(() => {
                    FileManager.save(regraHorario2)
                        .then(() => {
                            FileManager.save(regraHorario3)
                                .then(() => {

                                    request(app)
                                        .get(`/api/regrahorario/${regraHorario1.id}`)
                                        .end((error, res) => {
                                            expect(res.status).to.equal(HTTPStatus.OK);
                                            expect(res.body.payload.id).to.equal(regraHorario1.id);
                                            done(error);
                                        })

                                });
                        });
                });

        });
    });

    describe('POST /api/regrahorario/create', () => {
        it('Deve criar um objeto regraHorario', done => {

            const regraHorarioTeste = {
                date: '',
                weekly: [],
                daily: true,
                intervals: [
                    {
                        start: "23:00",
                        end: "23:30"
                    }
                ]
            }

            request(app)
                .post('/api/regrahorario/create')
                .send(regraHorarioTeste)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload.id).to.eql(0);
                    done(error);
                })

        });
    });

    describe('PUT /api/regrahorario/:id/update', () => {
        it('Deve editar um objeto regraHorario', done => {

            const regraHorario1_updated = {
                date: '08-02-1988',
                weekly: [],
                daily: true,
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
            };


            FileManager.save(regraHorario1)
                .then(() => {
                    FileManager.save(regraHorario2)
                        .then(() => {
                            FileManager.save(regraHorario3)
                                .then(() => {

                                    request(app)
                                        .put(`/api/regrahorario/${regraHorario1.id}/update`)
                                        .send(regraHorario1_updated)
                                        .end((error, res) => {
                                            expect(res.status).to.equal(HTTPStatus.OK);
                                            expect(res.body.payload.table[0].date).to.equal(regraHorario1_updated.date);
                                            done(error);
                                        })

                                });
                        });
                });

        });
    });

    describe('DELETE /api/regrahorario/:id/delete', () => {
        it('Deve deletar um objeto regraHorario', done => {

            FileManager.save(regraHorario1)
                .then(() => {
                    FileManager.save(regraHorario2)
                        .then(() => {
                            FileManager.save(regraHorario3)
                                .then(() => {

                                    request(app)
                                        .delete(`/api/regrahorario/${regraHorario1.id}/delete`)
                                        .end((error, res) => {
                                            expect(res.status).to.equal(HTTPStatus.OK);
                                            done(error);
                                        })

                                });
                        });
                });

        });
    });

})