"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEventUseCase = void 0;
class DeleteEventUseCase {
    eventRepository;
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }
    async execute(strapiId) {
        await this.eventRepository.deleteByStrapiId(strapiId);
    }
}
exports.DeleteEventUseCase = DeleteEventUseCase;
//# sourceMappingURL=delete-event.usecase.js.map