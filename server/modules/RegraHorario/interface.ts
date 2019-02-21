export interface IRegraHorario {
    readonly id: number,
    date: string,
    weekly: string[],
    daily: boolean,
    intervals: Array<{ start: string, end: string }>
}

export function createRegraHorario({ id, date, weekly, daily, intervals }: any): IRegraHorario {
    return { id, date, weekly, daily, intervals }
}

export function createRegrasHorarios(data: any[]): IRegraHorario[] {
    return data.map(createRegraHorario);
}