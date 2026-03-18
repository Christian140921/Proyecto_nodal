import { Evento } from '../../domain/entities/event.entity';
import { EventRepository } from '../../domain/repositories/event.repository';

export class GetEventsUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  async getAll(): Promise<Evento[]> {
    return this.eventRepository.findAll();
  }

  async getById(id: string): Promise<Evento | null> {
    return this.eventRepository.findById(id);
  }
}
