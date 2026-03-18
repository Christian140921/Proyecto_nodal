import { EventRepository } from '../../domain/repositories/event.repository';
export declare class CreateEventUseCase {
    private readonly eventRepo;
    constructor(eventRepo: EventRepository);
    execute(data: any): Promise<void>;
}
