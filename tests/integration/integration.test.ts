import { app, request, expect } from './config/helpers';

describe('Testes de integração', () => {

    describe('GET /api/regrahorario/all', () => {
        it('Deve retornar um json com todos os OBJETOS', done => {

            request(app)
                .get('/api/regrahorario/all')
                .end((error, res) => {
                    expect(res.status).to.equals(200);
                    done(error);
                })

        });
    });

    describe('GET /api/regrahorario/:id', () => {
        it('Deve retornar um json com um OBJETO', done => {

            request(app)
                .get(`/api/regrahorario/${1}`)
                .end((error, res) => {
                    expect(res.status).to.equals(200);
                    done(error);
                })

        });
    });

    describe('POST /api/regrahorario/create', () => {
        it('Deve criar um OBJETO', done => {

            const obj = {
                nome: 'Teste'
            }
            request(app)
                .post('/api/regrahorario/create')
                .send(obj)
                .end((error, res) => {
                    expect(res.status).to.equals(200);
                    done(error);
                })

        });
    });

    describe('PUT /api/regrahorario/:id/update', () => {
        it('Deve editar um OBJETO', done => {

            const obj = {
                nome: 'TesteUpdate'
            }
            request(app)
                .post(`/api/regrahorario/${1}/update`)
                .send(obj)
                .end((error, res) => {
                    expect(res.status).to.equals(200);
                    done(error);
                })

        });
    });

    describe('DELETE /api/regrahorario/:id/delete', () => {
        it('Deve deletar um OBJETO', done => {

            request(app)
                .delete(`/api/regrahorario/${1}/delete`)
                .end((error, res) => {
                    expect(res.status).to.equals(200);
                    done(error);
                })

        });
    });

})