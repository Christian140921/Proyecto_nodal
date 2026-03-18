import { Controller, Get, Param } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateNewsUseCase } from '../../application/use-cases/create-news.usecase';
import { GetNewsUseCase } from '../../application/use-cases/get-news.usecase';

@Controller('news')
export class NewsController {
  constructor(
    private readonly createNewsUseCase: CreateNewsUseCase,
    private readonly getNewsUseCase: GetNewsUseCase,
  ) {}

  @Get()
  async findAll() {
    const news = await this.getNewsUseCase.getAll();
    return { success: true, data: news };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const news = await this.getNewsUseCase.getById(id);
    return { success: true, data: news };
  }

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
