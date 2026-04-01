import { Schema, Document, Types } from 'mongoose';

export interface NewsDocument extends Document {
QWER6: Types.ObjectId;
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
    descripcion: { type: String, required: false, default: '' },
    autor: { type: String, required: false, default: '' },
    categoria: { type: String, required: false, default: '' },
    imagen: { type: String, default: null },
  },
  {
    timestamps: true,
  },
);
