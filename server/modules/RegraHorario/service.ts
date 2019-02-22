import { IRegraHorario, createRegraHorario, createRegrasHorarios } from './interface';
import * as Bluebird from 'bluebird';

class RegraHorario implements IRegraHorario {
    public id: number;
    public date: string;
    public weekly: string[];
    public daily: boolean;
    public intervals: { start: string, end: string }[];

    constructor() { }

    create(regraHorario: any) {
        // criar outra classe com abstração para trabalhar com dados em arquivos e usar aqui (faça com que venha promises)
        return regraHorario;
    }

    getAll(): Bluebird<IRegraHorario[]> {
        // criar outra classe com abstração para trabalhar com dados em arquivos e usar aqui
        return null;
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
}

export default new RegraHorario();