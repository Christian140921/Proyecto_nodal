"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEventUseCase = void 0;
const event_entity_1 = require("../../domain/entities/event.entity");
class CreateEventUseCase {
    eventRepo;
    constructor(eventRepo) {
        this.eventRepo = eventRepo;
    }
    async execute(data) {
        const evento = new event_entity_1.Evento(data.strapiId, data.titulo, data.descripcion || '', data.fecha ? new Date(data.fecha) : new Date(), data.tipo_evento || '', data.imagen || null);
        await this.eventRepo.save(evento);
    }
}
exports.CreateEventUseCase = CreateEventUseCase;
//# sourceMappingURL=create-event.usecase.js.map