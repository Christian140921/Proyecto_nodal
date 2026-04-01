import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { NewsSchema } from './infrastructure/database/news.schema';
import { NewsRepositoryImpl } from './infrastructure/repositories/news.repository.impl';
import { CreateNewsUseCase } from './application/use-cases/create-news.usecase';
import { GetNewsUseCase } from './application/use-cases/get-news.usecase';
import { NewsController } from './presentation/controllers/news.controller';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27020/ms_noticias_db', {
      retryAttempts: 3,
      retryDelay: 1000,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    }),
    MongooseModule.forFeature([{ name: 'News', schema: NewsSchema }]),
  ],
  controllers: [NewsController],
  providers: [
    {
      provide: 'NewsRepository',
      useFactory: (newsModel) => new NewsRepositoryImpl(newsModel),
      inject: [getModelToken('News')],
    },
    {
      provide: CreateNewsUseCase,
      useFactory: (newsRepo) => new CreateNewsUseCase(newsRepo),
      inject: ['NewsRepository'],
    },
    {
      provide: GetNewsUseCase,
      useFactory: (newsRepo) => new GetNewsUseCase(newsRepo),
      inject: ['NewsRepository'],
    },
  ],
})
export class AppModule {}
