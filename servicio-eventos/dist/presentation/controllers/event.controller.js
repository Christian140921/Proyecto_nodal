"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const create_event_usecase_1 = require("../../application/use-cases/create-event.usecase");
const delete_event_usecase_1 = require("../../application/use-cases/delete-event.usecase");
const get_events_usecase_1 = require("../../application/use-cases/get-events.usecase");
let EventController = class EventController {
    createEventUseCase;
    deleteEventUseCase;
    getEventsUseCase;
    constructor(createEventUseCase, deleteEventUseCase, getEventsUseCase) {
        this.createEventUseCase = createEventUseCase;
        this.deleteEventUseCase = deleteEventUseCase;
        this.getEventsUseCase = getEventsUseCase;
    }
    async findAll() {
        const events = await this.getEventsUseCase.getAll();
        return { success: true, data: events };
    }
    async findOne(id) {
        const event = await this.getEventsUseCase.getById(id);
        return { success: true, data: event };
    }
    async syncEvent(data) {
        console.log('[Event MS] 📥 Recibido evento de Strapi:', JSON.stringify(data, null, 2));
        try {
            await this.createEventUseCase.execute(data);
            console.log('[Event MS] ✅ Evento procesado y guardado correctamente');
            return { success: true };
        }
        catch (error) {
            console.error('[Event MS] ❌ Error procesando evento:', error.stack || error.message);
            return { success: false, error: error.message };
        }
    }
    async deleteEvent(data) {
        await this.deleteEventUseCase.execute(data.strapiId);
        return { success: true };
    }
};
exports.EventController = EventController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'sync_event' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "syncEvent", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_event' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "deleteEvent", null);
exports.EventController = EventController = __decorate([
    (0, common_1.Controller)('events'),
    __metadata("design:paramtypes", [create_event_usecase_1.CreateEventUseCase,
        delete_event_usecase_1.DeleteEventUseCase,
        get_events_usecase_1.GetEventsUseCase])
], EventController);
//# sourceMappingURL=event.controller.js.map