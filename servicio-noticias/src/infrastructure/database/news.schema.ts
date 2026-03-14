import { Schema, Document } from 'mongoose';

export interface NewsDocument extends Document {
  strapiId: number;
  titulo: string;
  descripcion: string;
  autor: string;
  categoria: string;
  imagen: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const NewsSchema = new Schema<NewsDocument>(
  {
    strapiId: { type: Number, required: true, unique: true },
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    autor: { type: String, required: true },
    categoria: { type: String, required: true },
    imagen: { type: String, default: null },
  },
  {
    timestamps: true,
  },
);
