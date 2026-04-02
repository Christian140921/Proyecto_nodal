import { Evento } from '../entities/event.entity';

export interface EventRepository {
  findAll(): Promise<Evento[]>;
  findById(id: string): Promise<Evento | null>;
  save(evento: Evento): Promise<Evento>;
  deleteByStrapiId(strapiId: number): Promise<void>;
}
