import { app, request, expect } from './config/helpers';
import * as HTTPStatus from 'http-status';

describe('Testes de integração', () => {

    'use strict';
    const config = require('../../server/config/env/config')();

    let id;

    const regraHorarioDateTest = {
        id: 1,
        kind: {
            date: '25-11-2018',
            weekly: [],
            daily: false
        },
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

    const regraHorarioWeeklyTest = {
        id: 2,
        kind: {
            date: null,
            weekly: ['mon', 'thu', 'sat'],
            daily: false
        },
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

    const regraHorarioDailyTest = {
        id: 3,
        kind: {
            date: null,
            weekly: [],
            daily: true
        },
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

    describe('GET /api/regrahorario/all', () => {
        it('Deve retornar um json com todos os objetos regraHorario', done => {

            request(app)
                .get('/api/regrahorario/all')
                .end((error, res) => {
                    expect(res.status).to.equals(HTTPStatus.OK);
                    done(error);
                })

        });
    });

    describe('GET /api/regrahorario/:id', () => {
        it('Deve retornar um json com um objeto regraHorario', done => {

            request(app)
                .get(`/api/regrahorario/${1}`)
                .end((error, res) => {
                    expect(res.status).to.equals(HTTPStatus.OK);
                    done(error);
                })

        });
    });

    describe('POST /api/regrahorario/create', () => {
        it('Deve criar um objeto regraHorario', done => {

            const obj = {
                nome: 'Teste'
            }
            request(app)
                .post('/api/regrahorario/create')
                .send(obj)
                .end((error, res) => {
                    expect(res.status).to.equals(HTTPStatus.OK);
                    done(error);
                })

        });
    });

    describe('PUT /api/regrahorario/:id/update', () => {
        it('Deve editar um objeto regraHorario', done => {

            const obj = {
                nome: 'TesteUpdate'
            }
            request(app)
                .put(`/api/regrahorario/${1}/update`)
                .send(obj)
                .end((error, res) => {
                    expect(res.status).to.equals(HTTPStatus.OK);
                    done(error);
                })

        });
    });

    describe('DELETE /api/regrahorario/:id/delete', () => {
        it('Deve deletar um objeto regraHorario', done => {

            request(app)
                .delete(`/api/regrahorario/${1}/delete`)
                .end((error, res) => {
                    expect(res.status).to.equals(HTTPStatus.OK);
                    done(error);
                })

        });
    });

})