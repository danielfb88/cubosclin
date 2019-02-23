import * as appRoot from 'app-root-path';
import * as fs from 'file-system';
import { reject } from 'bluebird';
import * as _ from 'lodash';
import { json } from 'body-parser';

const config = require('../../server/config/env/config')();
let filePath = `${appRoot.path}/${config.databaseFileName}`;

class FileManager {

    constructor() { }

    append(newObj: any): any {
        console.log('iniciando append');
        return new Promise(function (resolve, reject) {
            fs.readFile(filePath, 'utf8', function readFileCallback(err, readed_data) {
                if (err) {
                    console.log('dentro da promise: erro');
                    reject(err);

                } else {
                    console.log('dentro da promise: sem erro');
                    var objStored = JSON.parse(readed_data); //now it an object
                    var newId = objStored.table.length;
                    newObj.id = newId;

                    objStored.table.push(newObj); //add some data
                    var json_text = JSON.stringify(objStored); //convert it back to json
                    console.log('dentro da promise: tudo ok aqui?');
                    console.log(filePath);
                    console.log(json_text);

                    fs.writeFile(filePath, json_text, 'utf8',
                        resolve((err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                return objStored;
                            }
                        }));
                    resolve();

                }
            });
        });
    }

    update(id: number, updatedObj: any): any {
        return new Promise(function (resolve, reject) {
            let found: boolean = false;
            let table: Array<any>;

            fs.readFile(filePath, 'utf8', function readFileCallback(err, readed_data) {
                if (err) {
                    reject(err);

                } else {
                    table = JSON.parse(readed_data).table; //now it an object
                    table.forEach(obj => {
                        if (obj.id == id) {
                            found = true;
                            obj.date = updatedObj.date;
                            obj.weekly = updatedObj.weekly;
                            obj.daily = updatedObj.daily;
                            obj.intervals = updatedObj.intervals;
                        }
                    });
                    var json_text = JSON.stringify({ table }); //convert it back to json

                    if (found) {
                        fs.writeFile(filePath, json_text, 'utf8', function (err) {
                            if (err) {
                                reject(err);
                            } else {
                                console.log('***json atualizado***');
                                resolve({ table });
                            }
                        });
                    } else {
                        reject(`Id: ${id} Não encontrado`);
                    }
                }
            });
        });
    };

    getAll(): any {
        return new Promise(function (resolve, reject) {
            fs.readFile(filePath, 'utf8', function readFileCallback(err, readed_data) {
                if (err) {
                    reject(err);

                } else {
                    var objStored = JSON.parse(readed_data); //now it an object
                    console.log('***buscado todos***');
                    resolve(objStored);
                }
            });

        });
    }

    getById(id: number): any {
        return new Promise(function (resolve, reject) {
            fs.readFile(filePath, 'utf8', function readFileCallback(err, readed_data) {
                if (err) {
                    reject(err);

                } else {
                    var arr = JSON.parse(readed_data).table; //now it an object
                    arr.forEach(obj => {
                        if (obj.id == id) {
                            console.log('***buscado por id***');
                            resolve(obj);
                        }
                    });
                    reject(`Id: ${id} Não encontrado`);
                }
            });

        });
    }

    deleteById(id: number): any {
        return new Promise(function (resolve, reject) {
            fs.readFile(filePath, 'utf8', function readFileCallback(err, readed_data) {
                if (err) {
                    reject(err);

                } else {
                    var arr = JSON.parse(readed_data).table; //now it an object
                    var table = [];

                    arr.forEach(obj => {
                        if (obj.id != id) {
                            table.push(obj);
                        }
                    });

                    var json_text = JSON.stringify({ table }); //convert it back to json
                    fs.writeFile(filePath, json_text, 'utf8', function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            if (table.length == arr.length) {
                                reject(`Id: ${id} Não encontrado`);
                            } else {
                                console.log('***deletado por id***');
                                resolve({ table });
                            }
                        }
                    });



                }
            });

        });
    }

    initJson(): any {
        var clean_obj = { table: [] };
        var json_text = JSON.stringify(clean_obj);

        return new Promise(function (resolve, reject) {
            fs.writeFile(filePath, json_text, 'utf8', function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(clean_obj);
                    console.log('***json inicializado***');
                }
            });
        })

    }

    createFile() {
        return new Promise(function (resolve, reject) {
            fs.open(filePath, 'w', function (err, file) {
                if (err) {
                    reject(err);
                } else {
                    resolve(file);
                    console.log('***arquivo criado***');
                }
            });
        });
    }

    deleteFile() {
        return new Promise(function (resolve, reject) {
            fs.unlink(filePath, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                    console.log('***arquivo deletado***');
                }
            });
        });
    }
}

export default new FileManager();