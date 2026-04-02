import { EventRepository } from '../../domain/repositories/event.repository';
export declare class DeleteEventUseCase {
    private readonly eventRepository;
    constructor(eventRepository: EventRepository);
    execute(strapiId: number): Promise<void>;
}
