import { Model } from 'mongoose';
import { News } from '../../domain/entities/news.entity';
import { NewsRepository } from '../../domain/repositories/news.repository';
import { NewsDocument } from '../database/news.schema';

export class NewsRepositoryImpl implements NewsRepository {
  constructor(private readonly newsModel: Model<NewsDocument>) {}

  private toDomain(doc: NewsDocument): News {
    return new News(
      doc._id.toString(),
      doc.strapiId,
      doc.titulo,
      doc.descripcion,
      doc.autor,
      doc.categoria,
      doc.imagen,
      doc.createdAt,
      doc.updatedAt,
    );
  }

  async findAll(): Promise<News[]> {
    const docs = await this.newsModel.find().sort({ createdAt: -1 }).exec();
    return docs.map((doc) => this.toDomain(doc));
  }

  async findById(id: string): Promise<News | null> {
    const doc = await this.newsModel.findById(id).exec();
    return doc ? this.toDomain(doc) : null;
  }

  async findByStrapiId(strapiId: number): Promise<News | null> {
    const doc = await this.newsModel.findOne({ strapiId }).exec();
    return doc ? this.toDomain(doc) : null;
  }

  async save(news: News): Promise<News> {
    if (news.id) {
      const doc = await this.newsModel
        .findByIdAndUpdate(
          news.id,
          {
            titulo: news.titulo,
            descripcion: news.descripcion,
            autor: news.autor,
            categoria: news.categoria,
            imagen: news.imagen,
          },
          { new: true },
        )
        .exec();
      if (!doc) throw new Error(`News with id ${news.id} not found`);
      return this.toDomain(doc);
    }

    const created = await this.newsModel.create({
      strapiId: news.strapiId,
      titulo: news.titulo,
      descripcion: news.descripcion,
      autor: news.autor,
      categoria: news.categoria,
      imagen: news.imagen,
    });
    return this.toDomain(created);
  }

  async deleteByStrapiId(strapiId: number): Promise<void> {
    await this.newsModel.deleteOne({ strapiId }).exec();
  }
}
