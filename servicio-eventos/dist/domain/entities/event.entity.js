"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Evento = void 0;
class Evento {
    strapiId;
    titulo;
    descripcion;
    fecha;
    tipo_evento;
    imagen;
    constructor(strapiId, titulo, descripcion, fecha, tipo_evento, imagen) {
        this.strapiId = strapiId;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.tipo_evento = tipo_evento;
        this.imagen = imagen;
    }
}
exports.Evento = Evento;
//# sourceMappingURL=event.entity.js.map