import { app, request, expect } from './config/helpers';

describe('Testes de integração', () => {

    describe('GET /api/all', () => {
        it('Deve retornar um json com todos os OBJETOS', done => {

            request(app)
                .get('/api/all')
                .end((error, res) => {
                    expect(res.status).to.equals(200);
                })

        });
    });

    describe('GET /api/:id', () => {
        it('Deve retornar um json com um OBJETO', done => {

            request(app)
                .get(`/api/${1}`)
                .end((error, res) => {
                    expect(res.status).to.equals(200);
                })

        });
    });

    describe('POST /api/new', () => {
        it('Deve criar um OBJETO', done => {

            const obj = {
                nome: 'Teste'
            }
            request(app)
                .post('/api/new')
                .send(obj)
                .end((error, res) => {
                    expect(res.status).to.equals(200);
                })

        });
    });

    describe('PUT /api/:id/edit', () => {
        it('Deve editar um OBJETO', done => {

            const obj = {
                nome: 'TesteUpdate'
            }
            request(app)
                .post(`/api/${1}/edit`)
                .send(obj)
                .end((error, res) => {
                    expect(res.status).to.equals(200);
                })

        });
    });

    describe('DELETE /api/:id', () => {
        it('Deve deletar um OBJETO', done => {

            request(app)
                .delete(`/api/${1}`)
                .end((error, res) => {
                    expect(res.status).to.equals(200);
                })

        });
    });

})