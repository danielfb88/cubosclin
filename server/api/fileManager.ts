import * as appRoot from 'app-root-path';
import * as fs from 'file-system';

const config = require('../../server/config/env/config')();
let filePath = `${appRoot.path}/${config.databaseFileName}`;

class FileManager {

    constructor() { }

    save(newObj: any) {

        fs.readFile(filePath, 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);

            } else {
                console.log(data);
                let objStored = JSON.parse(data); //now it an object
                objStored.table.push(newObj); //add some data
                let json_text = JSON.stringify(objStored); //convert it back to json
                fs.writeFile(filePath, json_text, 'utf8', function (err) { console.log(err) }); // write it back 
            }
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

    clean() {
        let json_text = JSON.stringify({ table: [] });
        fs.writeFile(filePath, json_text, 'utf8', function (err) { console.log(err) });
    }
}

export default new FileManager();