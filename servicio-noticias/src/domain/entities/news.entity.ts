export class News {
  constructor(
    public readonly id: string | null,
    public readonly strapiId: number,
    public readonly titulo: string,
    public readonly descripcion: string,
    public readonly autor: string,
    public readonly categoria: string,
    public readonly imagen: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(props: {
    strapiId: number;
    titulo: string;
    descripcion: string;
    autor: string;
    categoria: string;
    imagen?: string | null;
  }): News {
    return new News(
      null,
      props.strapiId,
      props.titulo,
      props.descripcion,
      props.autor,
      props.categoria,
      props.imagen ?? null,
      new Date(),
      new Date(),
    );
  }
}
