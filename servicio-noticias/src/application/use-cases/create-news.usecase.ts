import { News } from '../../domain/entities/news.entity';
import { NewsRepository } from '../../domain/repositories/news.repository';

export class CreateNewsUseCase {
  constructor(private readonly newsRepository: NewsRepository) { }

  async execute(data: {
    strapiId: number;
    titulo: string;
    descripcion: string;
    autor: string;
    categoria: string;
    imagen?: string | null;
  }): Promise<News> {
    const existing = await this.newsRepository.findByStrapiId(data.strapiId);

    if (existing) {
      const updated = new News(
        existing.id,
        existing.strapiId,
        data.titulo,
        data.descripcion,
        data.autor,
        data.categoria,
        data.imagen ?? null,
        existing.createdAt,
        new Date(),
      );
      return this.newsRepository.save(updated);
    }

    const news = News.create(data);
    return this.newsRepository.save(news);
  }
}
