import { testdouble, expect } from './config/helpers';
import RegraHorarioService from '../../server/modules/RegraHorario/service';

describe('Testes Unitários do Service', () => {

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

    describe('Método Create', () => {
        it('Deve criar uma nova Regra de Horário', () => {
            const novaRegraHorario = {
                id: 1,
                date: '08-02-2019',
                weekly: [],
                daily: false,
                intervals: [{ start: '10:20', end: '11:40' }]
            }

            return RegraHorarioService.create(novaRegraHorario)
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

            return RegraHorarioService.update(1, regraHorarioAtualizada)
                .then(data => {
                    expect(data[0]).to.be.equal(1)
                })
        });
    });

    describe('Método getById', () => {
        it('Deve retornar um Regra de Horário de acordo com o ID passado', () => {
            return RegraHorarioService.getById(1)
                .then(data => {
                    expect(data[0]).to.be.equal(1)
                })
        });
    });

    describe('Método Get Regras de Horários', () => {
        it('Deve retornar uma lista com todas as Regras de Horários', () => {
            return RegraHorarioService.getAll().then(data => {
                expect(data).to.be.an('array');
            })
        });
    });

    describe('Método Delete', () => {
        it('Deve deletar uma Regra de Horário', () => {
            return RegraHorarioService.delete(1)
                .then(data => {
                    expect(data).to.be.equal(1) // retorna a qtd de registro afetado
                })
        });
    });

})