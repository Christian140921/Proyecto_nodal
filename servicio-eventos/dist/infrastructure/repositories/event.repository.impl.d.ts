import { Model } from 'mongoose';
import { Evento } from '../../domain/entities/event.entity';
import { EventRepository } from '../../domain/repositories/event.repository';
import { EventDocument } from '../database/event.schema';
export declare class EventRepositoryImpl implements EventRepository {
    private readonly eventModel;
    constructor(eventModel: Model<EventDocument>);
    private toDomain;
    findAll(): Promise<Evento[]>;
    findById(id: string): Promise<Evento | null>;
    save(evento: Evento): Promise<Evento>;
}
