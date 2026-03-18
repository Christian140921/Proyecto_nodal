export declare class Evento {
    readonly strapiId: number;
    readonly titulo: string;
    readonly descripcion: string;
    readonly fecha: Date;
    readonly tipo_evento: string;
    readonly imagen: string | null;
    constructor(strapiId: number, titulo: string, descripcion: string, fecha: Date, tipo_evento: string, imagen: string | null);
}
