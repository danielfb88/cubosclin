import { IRegraHorario, createRegraHorario, createRegrasHorarios } from './interface';
import * as Bluebird from 'bluebird';
import FileManager from '../../api/fileManager';

class RegraHorario implements IRegraHorario {
    public id: number;
    public date: string;
    public weekly: string[];
    public daily: boolean;
    public intervals: { start: string, end: string }[];

    constructor() { }

    create(regraHorario: any): Bluebird<IRegraHorario> {
        return FileManager.append(regraHorario);
    }

    getAll(): Bluebird<IRegraHorario[]> {
        return FileManager.getAll();
    }

    getById(id: number): Bluebird<IRegraHorario> {
        return FileManager.getById(id);
    }

    update(id: number, regraHorario: any): Bluebird<IRegraHorario> {
        return FileManager.update(id, regraHorario);
    }

    delete(id: number) {
        return FileManager.deleteById(id);
    }

    deleteAll() {
        return FileManager.initJson();
    }
}

export default new RegraHorario();