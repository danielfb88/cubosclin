import { testdouble, expect } from './config/helpers';
import RegraHorario from '../../server/modules/RegraHorario/service';
import FileManager from '../../server/api/fileManager';

// describe('Testes Unitários do File Manager', () => {

//     beforeEach((done) => {
//         FileManager.clean();
//         done();
//     });

//     describe('Método getAll', () => {
//         it('Deve buscar todos os objeto no arquivo', done => {
//             const newObj1 = {
//                 id: 1,
//                 date: '25-11-2018',
//                 weekly: [],
//                 daily: false,
//                 intervals: [
//                     {
//                         start: "00:00",
//                         end: "01:00"
//                     },
//                 ]
//             }

//             const newObj2 = {
//                 id: 2,
//                 date: null,
//                 weekly: [],
//                 daily: true,
//                 intervals: [
//                     {
//                         start: "01:00",
//                         end: "02:00"
//                     },
//                     {
//                         start: "02:01",
//                         end: "02:30"
//                     },
//                 ]
//             }

//             const newObj3 = {
//                 id: 3,
//                 date: null,
//                 weekly: ['mon', 'thu', 'sat'],
//                 daily: false,
//                 intervals: [
//                     {
//                         start: "03:00",
//                         end: "04:00"
//                     }
//                 ]
//             }

//             FileManager.save(newObj1)
//                 .then(() => {
//                     FileManager.save(newObj2)
//                         .then(() => {
//                             FileManager.save(newObj3)
//                                 .then(() => {
//                                     FileManager.getAll()
//                                         .then(data => {
//                                             expect(data.table.length).to.equal(3);
//                                             done();
//                                         })
//                                 });
//                         });
//                 });

//         });
//     });

//     // describe('Método save', () => {
//     //     it('Deve criar um objeto no arquivo', () => {
//     //         const newObj = {
//     //             id: 4,
//     //             date: null,
//     //             weekly: ['sat'],
//     //             daily: false,
//     //             intervals: [
//     //                 {
//     //                     start: "12:00",
//     //                     end: "14:00"
//     //                 }
//     //             ]
//     //         }

//     //         return FileManager.save(newObj)
//     //             .then(data => {
//     //                 expect(data.id).to.equal(newObj.id)
//     //             })
//     //     });
//     // });

//     // describe('Método clean', () => {
//     //     it('Deve limpar o arquivo', () => {
//     //         FileManager.clean()
//     //         .then(obj => {
//     //             expect(obj.table).to.be.empty;
//     //         })
//     //     });
//     // });

// });

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

    // describe('Método Create', () => {
    //     it('Deve criar uma nova Regra de Horário', () => {
    //         return RegraHorario.create(regraHorario1)
    //             .then(data => {
    //                 expect(data.id).to.equal(regraHorario1.id);
    //             })
    //     });
    // });

    // describe('Método Update', () => {
    //     it('Deve atualizar uma Regra de Horário', () => {
    //         const regraHorarioAtualizada = {
    //             date: null,
    //             weekly: [],
    //             daily: true,
    //             intervals: [{ start: '10:20', end: '11:40' }]
    //         }

    //         return RegraHorarioService.update(1, regraHorarioAtualizada)
    //             .then(data => {
    //                 expect(data[0]).to.be.equal(1)
    //             })
    //     });
    // });

    describe('Método getById', () => {
        it('Deve retornar um Regra de Horário de acordo com o ID passado', () => {

            FileManager.save(regraHorario1)
                .then(() => {
                    FileManager.save(regraHorario2)
                        .then(() => {
                            FileManager.save(regraHorario3)
                                .then(() => {
                                    FileManager.getById(0)
                                        .then(data => {
                                            console.log('aaaaaaaaaaaaaaaaaaaaa');
                                            console.log(data);
                                            expect(data.id).to.equal(0);
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        })
                                });
                        });
                });
        });
    });

    // describe('Método Get Regras de Horários', () => {
    //     it('Deve retornar uma lista com todas as Regras de Horários', () => {
    //         return RegraHorarioService.getAll().then(data => {
    //             expect(data).to.be.an('array');
    //         })
    //     });
    // });

    // describe('Método Delete', () => {
    //     it('Deve deletar uma Regra de Horário', () => {
    //         return RegraHorarioService.delete(1)
    //             .then(data => {
    //                 expect(data).to.be.equal(1) // retorna a qtd de registro afetado
    //             })
    //     });
    // });




})