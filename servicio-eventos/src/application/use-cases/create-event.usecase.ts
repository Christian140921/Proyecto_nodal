import { Evento } from '../../domain/entities/event.entity';
import { EventRepository } from '../../domain/repositories/event.repository';

export class CreateEventUseCase {
  constructor(private readonly eventRepo: EventRepository) {}

  async execute(data: any): Promise<void> {
    const evento = new Evento(
      data.strapiId,
      data.titulo,
      data.descripcion || '',
      data.fecha ? new Date(data.fecha) : new Date(),
      data.tipo_evento || '',
      data.imagen || null,
    );

    await this.eventRepo.save(evento);
  }
}
