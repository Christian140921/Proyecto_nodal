"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRepositoryImpl = void 0;
const event_entity_1 = require("../../domain/entities/event.entity");
class EventRepositoryImpl {
    eventModel;
    constructor(eventModel) {
        this.eventModel = eventModel;
    }
    toDomain(doc) {
        return new event_entity_1.Evento(doc.strapiId, doc.titulo, doc.descripcion, doc.fecha, doc.tipo_evento, doc.imagen);
    }
    async findAll() {
        const docs = await this.eventModel.find().sort({ fecha: -1 }).exec();
        return docs.map((doc) => this.toDomain(doc));
    }
    async findById(id) {
        const doc = await this.eventModel.findById(id).exec();
        return doc ? this.toDomain(doc) : null;
    }
    async save(evento) {
        const { strapiId, ...updateData } = evento;
        const updated = await this.eventModel.findOneAndUpdate({ strapiId }, { $set: updateData }, { upsert: true, new: true });
        return this.toDomain(updated);
    }
}
exports.EventRepositoryImpl = EventRepositoryImpl;
//# sourceMappingURL=event.repository.impl.js.map