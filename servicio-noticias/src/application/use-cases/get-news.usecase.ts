import { News } from '../../domain/entities/news.entity';
import { NewsRepository } from '../../domain/repositories/news.repository';

export class GetNewsUseCase {
  constructor(private readonly newsRepository: NewsRepository) {}

  async getAll(): Promise<News[]> {
    return this.newsRepository.findAll();
  }

  async getById(id: string): Promise<News | null> {
    return this.newsRepository.findById(id);
  }
}
