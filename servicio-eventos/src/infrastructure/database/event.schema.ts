import { Schema, Document } from 'mongoose';

export interface EventDocument extends Document {
  strapiId: number;
  titulo: string;
  descripcion: string;
  fecha: Date;
  tipo_evento: string;
  imagen: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const EventSchema = new Schema<EventDocument>(
  {
    strapiId: { type: Number, required: true, unique: true },
    titulo: { type: String, required: true },
    descripcion: { type: String, required: false, default: '' },
    fecha: { type: Date, required: false, default: Date.now },
    tipo_evento: { type: String, required: false, default: '' },
    imagen: { type: String, default: null },
  },
  {
    timestamps: true,
  },
);
