import * as appRoot from 'app-root-path';
import * as fs from 'file-system';
import { reject } from 'bluebird';

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

    clean(): any {
        var clean_obj = { table: [] };
        var json_text = JSON.stringify(clean_obj);

        return new Promise(function (resolve, reject) {
            fs.writeFile(filePath, json_text, 'utf8', function (err) { reject(err) });
            resolve(clean_obj);
        })

    }
}

export default new FileManager();