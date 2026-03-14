import { News } from '../entities/news.entity';

export interface NewsRepository {
  findAll(): Promise<News[]>;
  findById(id: string): Promise<News | null>;
  findByStrapiId(strapiId: number): Promise<News | null>;
  save(news: News): Promise<News>;
  deleteByStrapiId(strapiId: number): Promise<void>;
}
