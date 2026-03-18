"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEventsUseCase = void 0;
class GetEventsUseCase {
    eventRepository;
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }
    async getAll() {
        return this.eventRepository.findAll();
    }
    async getById(id) {
        return this.eventRepository.findById(id);
    }
}
exports.GetEventsUseCase = GetEventsUseCase;
//# sourceMappingURL=get-events.usecase.js.map