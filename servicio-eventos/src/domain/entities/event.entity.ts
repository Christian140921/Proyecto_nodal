export class Evento {
  constructor(
    public readonly strapiId: number,
    public readonly titulo: string,
    public readonly descripcion: string,
    public readonly fecha: Date,
    public readonly tipo_evento: string,
    public readonly imagen: string | null,
  ) {}
}
