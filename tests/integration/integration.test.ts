import { app, request, expect } from './config/helpers';
import * as HTTPStatus from 'http-status';

describe('Testes de integração', () => {

    'use strict';
    const config = require('../../server/config/env/config')();

    let id;

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
        id: 3,
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
        // 1 - remova todos os registros da base

        // 2 - use o serviço responsável para inserir os registros na base de dados em arquivo e chame o done() para finalizar o beforeEach

        done();
    })

    describe('GET /api/regrahorario/all', () => {
        it('Deve retornar um array com todos os objetos regraHorario', done => {

            request(app)
                .get('/api/regrahorario/all')
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.data).to.be.an('array');
                    expect(res.body.data[0].id).to.be.equal(regraHorario1.id);
                    done(error);
                })

        });
    });

    describe('GET /api/regrahorario/:id', () => {
        it('Deve retornar um array com apenas um objeto regraHorario', done => {

            request(app)
                .get(`/api/regrahorario/${regraHorario1.id}`)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.data.id).to.equal(regraHorario1.id);
                    expect(res.body.data).to.have.all.keys(['id', 'date', 'weekly', 'daily', 'intervals']);

                    id = res.body.data.id;
                    done(error);
                });

        });
    });

    describe('POST /api/regrahorario/create', () => {
        it('Deve criar um objeto regraHorario', done => {

            const regraHorarioTeste = {
                id: 4,
                date: null,
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
                    expect(res.body.data.id).to.eql(regraHorarioTeste.id);
                    done(error);
                })

        });
    });

    describe('PUT /api/regrahorario/:id/update', () => {
        it('Deve editar um objeto regraHorario', done => {

            const regraHorario1_updated = {
                id: 1,
                date: null,
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
            }
            request(app)
                .put(`/api/regrahorario/${regraHorario1.id}/update`)
                .send(regraHorario1_updated)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.data.id).to.equal(regraHorario1_updated.id);
                    done(error);
                })

        });
    });

    describe('DELETE /api/regrahorario/:id/delete', () => {
        it('Deve deletar um objeto regraHorario', done => {

            request(app)
                .delete(`/api/regrahorario/${regraHorario1.id}/delete`)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    done(error);
                })

        });
    });

})