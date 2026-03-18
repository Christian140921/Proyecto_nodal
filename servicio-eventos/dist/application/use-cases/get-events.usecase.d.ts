import { Evento } from '../../domain/entities/event.entity';
import { EventRepository } from '../../domain/repositories/event.repository';
export declare class GetEventsUseCase {
    private readonly eventRepository;
    constructor(eventRepository: EventRepository);
    getAll(): Promise<Evento[]>;
    getById(id: string): Promise<Evento | null>;
}
