import { NewsRepository } from '../../domain/repositories/news.repository';

export class DeleteNewsUseCase {
  constructor(private readonly newsRepository: NewsRepository) {}

  async execute(strapiId: number): Promise<void> {
    await this.newsRepository.deleteByStrapiId(strapiId);
  }
}
