import * as appRoot from 'app-root-path';
import * as fs from 'file-system';
import { reject } from 'bluebird';
import * as _ from 'lodash';

const config = require('../../server/config/env/config')();
let filePath = `${appRoot.path}/${config.databaseFileName}`;

class FileManager {

    constructor() { }

    save(newObj: any): any {
        return new Promise(function (resolve, reject) {
            fs.readFile(filePath, 'utf8', function readFileCallback(err, readed_data) {
                if (err) {
                    reject(err);

                } else {
                    var objStored = JSON.parse(readed_data); //now it an object
                    var newId = objStored.table.length;
                    newObj.id = newId;

                    objStored.table.push(newObj); //add some data
                    var json_text = JSON.stringify(objStored); //convert it back to json
                    fs.writeFile(filePath, json_text, 'utf8', function (err) { reject(err); }); // write it back 
                    resolve(newObj);
                }
            });
        });
    }

    update(updatedObj: any): any {

    };

    getAll(): any {
        return new Promise(function (resolve, reject) {
            fs.readFile(filePath, 'utf8', function readFileCallback(err, readed_data) {
                if (err) {
                    reject(err);

                } else {
                    var objStored = JSON.parse(readed_data); //now it an object
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
                    fs.writeFile(filePath, json_text, 'utf8', function (err) { reject(err); }); // write it back 

                    if (table.length == arr.length)
                        reject(`Id: ${id} Não encontrado`);
                    else
                        resolve(table);

                }
            });

        });
    }

    clean(): any {
        var clean_obj = { table: [] };
        var json_text = JSON.stringify(clean_obj);

        return new Promise(function (resolve, reject) {
            fs.writeFile(filePath, json_text, 'utf8', function (err) { reject(err) });
            resolve(clean_obj);
        })

    }

    createFile(fileName: string) {
        return new Promise(function (resolve, reject) {
            fs.open(`${appRoot.path}/${fileName}`, 'w', function (err, file) {
                if (err)
                    reject(err);
                else
                    resolve(file);
            });
        });
    }

    deleteFile(fileName: string) {
        return new Promise(function (resolve, reject) {
            fs.unlink(`${appRoot.path}/${fileName}`, function (err) {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
}

export default new FileManager();