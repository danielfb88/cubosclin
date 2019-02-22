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

    create(regraHorario: any) {
        return FileManager.save(regraHorario);
    }

    getAll(): Bluebird<IRegraHorario[]> {
        return FileManager.getAll();
    }

    getById(id: number): Bluebird<IRegraHorario> {
        // criar outra classe com abstração para trabalhar com dados em arquivos e usar aqui
        return null;
    }

    update(id: number, regraHorario: any) {
        // criar outra classe com abstração para trabalhar com dados em arquivos e usar aqui
        return regraHorario;
    }

    delete(id: number) {
        // criar outra classe com abstração para trabalhar com dados em arquivos e usar aqui
        return null;
    }

    deleteAll() {
        return FileManager.clean();
    }
}

export default new RegraHorario();