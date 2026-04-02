import { Model } from 'mongoose';
import { Evento } from '../../domain/entities/event.entity';
import { EventRepository } from '../../domain/repositories/event.repository';
import { EventDocument } from '../database/event.schema';

export class EventRepositoryImpl implements EventRepository {
  constructor(private readonly eventModel: Model<EventDocument>) {}

  private toDomain(doc: EventDocument): Evento {
    return new Evento(
      doc.strapiId,
      doc.titulo,
      doc.descripcion,
      doc.fecha,
      doc.tipo_evento,
      doc.imagen
    );
  }

  async findAll(): Promise<Evento[]> {
    const docs = await this.eventModel.find().sort({ fecha: -1 }).exec();
    return docs.map((doc) => this.toDomain(doc));
  }

  async findById(id: string): Promise<Evento | null> {
    const doc = await this.eventModel.findById(id).exec();
    return doc ? this.toDomain(doc) : null;
  }

  async save(evento: Evento): Promise<Evento> {
    const { strapiId, ...updateData } = evento;
    
    const updated = await this.eventModel.findOneAndUpdate(
      { strapiId },
      { $set: updateData },
      { upsert: true, new: true }
    );

    return this.toDomain(updated);
  }

  async deleteByStrapiId(strapiId: number): Promise<void> {
    await this.eventModel.deleteOne({ strapiId }).exec();
  }
}
