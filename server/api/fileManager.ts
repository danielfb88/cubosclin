import * as appRoot from 'app-root-path';
import * as fs from 'file-system';

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
                    let objStored = JSON.parse(readed_data); //now it an object
                    objStored.table.push(newObj); //add some data
                    let json_text = JSON.stringify(objStored); //convert it back to json
                    fs.writeFile(filePath, json_text, 'utf8', function (err) { reject(err); }); // write it back 
                    resolve(newObj);
                }
            });
        });

    }

    getAll(): any {
        fs.readFile(filePath, 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);

            } else {
                let obj = JSON.parse(data); //now it an object

                return obj;
            }
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