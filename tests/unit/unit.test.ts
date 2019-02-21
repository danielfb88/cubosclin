import { testdouble, expect } from './config/helpers';
import RegraHorario from '../../server/modules/RegraHorario/service';

describe('Testes Unitários do Service', () => {

    describe('Método Create', () => {
        it('Deve criar uma nova Regra de Horário', () => {
            const novaRegraHorario = {
                id: 1,
                date: '08-02-2019',
                weekly: [],
                daily: false,
                intervals: [{ start: '10:20', end: '11:40' }]
            }

            return new RegraHorario().create(novaRegraHorario)
                .then(data => {
                    expect(data.dataValues).to.have.all.keys(
                        ['id', 'date', 'weekly', 'daily', 'intervals']
                    )
                })
        });
    });

    describe('Método Update', () => {
        it('Deve atualizar uma Regra de Horário', () => {
            const regraHorarioAtualizada = {
                date: null,
                weekly: [],
                daily: true,
                intervals: [{ start: '10:20', end: '11:40' }]
            }

            return new RegraHorario().update(1, regraHorarioAtualizada)
                .then(data => {
                    expect(data[0]).to.be.equal(1)
                })
        });
    });

    describe('Método getById', () => {
        it('Deve retornar um Regra de Horário de acordo com o ID passado', () => {
            return new RegraHorario().getById(1)
                .then(data => {
                    expect(data[0]).to.be.equal(1)
                })
        });
    });

    describe('Método Get Regras de Horários', () => {
        it('Deve retornar uma lista com todas as Regras de Horários', () => {
            return new RegraHorario().getAll().then(data => {
                expect(data).to.be.an('array');
                expect(data[0]).to.have.all.keys(
                    ['id', 'date', 'weekly', 'daily', 'intervals']
                )
            })
        });
    });

    describe('Método Delete', () => {
        it('Deve deletar uma Regra de Horário', () => {
            return new RegraHorario().delete(1)
                .then(data => {
                    expect(data).to.be.equal(1) // retorna a qtd de registro afetado
                })
        });
    });

})