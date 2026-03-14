import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateNewsUseCase } from '../../application/use-cases/create-news.usecase';

@Controller()
export class NewsController {
  constructor(private readonly createNewsUseCase: CreateNewsUseCase) {}

  @MessagePattern({ cmd: 'sync_news' })
  async syncNews(data: {
    strapiId: number;
    titulo: string;
    descripcion: string;
    autor: string;
    categoria: string;
    imagen?: string | null;
  }) {
    const news = await this.createNewsUseCase.execute(data);
    return { success: true, data: news };
  }
}
