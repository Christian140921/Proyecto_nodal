"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSchema = void 0;
const mongoose_1 = require("mongoose");
exports.EventSchema = new mongoose_1.Schema({
    strapiId: { type: Number, required: true, unique: true },
    titulo: { type: String, required: true },
    descripcion: { type: String, required: false, default: '' },
    fecha: { type: Date, required: false, default: Date.now },
    tipo_evento: { type: String, required: false, default: '' },
    imagen: { type: String, default: null },
}, {
    timestamps: true,
});
//# sourceMappingURL=event.schema.js.map