import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsSchema } from './infrastructure/database/news.schema';
import { NewsRepositoryImpl } from './infrastructure/repositories/news.repository.impl';
import { CreateNewsUseCase } from './application/use-cases/create-news.usecase';
import { NewsController } from './presentation/controllers/news.controller';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/ms_noticias_db'),
    MongooseModule.forFeature([{ name: 'News', schema: NewsSchema }]),
  ],
  controllers: [NewsController],
  providers: [
    {
      provide: 'NewsRepository',
      useFactory: (newsModel) => new NewsRepositoryImpl(newsModel),
      inject: ['NewsModel'],
    },
    {
      provide: CreateNewsUseCase,
      useFactory: (newsRepo) => new CreateNewsUseCase(newsRepo),
      inject: ['NewsRepository'],
    },
  ],
})
export class AppModule {}
