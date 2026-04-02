import { CreateEventUseCase } from '../../application/use-cases/create-event.usecase';
import { DeleteEventUseCase } from '../../application/use-cases/delete-event.usecase';
import { GetEventsUseCase } from '../../application/use-cases/get-events.usecase';
export declare class EventController {
    private readonly createEventUseCase;
    private readonly deleteEventUseCase;
    private readonly getEventsUseCase;
    constructor(createEventUseCase: CreateEventUseCase, deleteEventUseCase: DeleteEventUseCase, getEventsUseCase: GetEventsUseCase);
    findAll(): Promise<{
        success: boolean;
        data: import("../../domain/entities/event.entity").Evento[];
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: import("../../domain/entities/event.entity").Evento | null;
    }>;
    syncEvent(data: any): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
    deleteEvent(data: {
        strapiId: number;
    }): Promise<{
        success: boolean;
    }>;
}
