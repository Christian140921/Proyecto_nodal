import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { EventSchema } from './infrastructure/database/event.schema';
import { EventRepositoryImpl } from './infrastructure/repositories/event.repository.impl';
import { CreateEventUseCase } from './application/use-cases/create-event.usecase';
import { GetEventsUseCase } from './application/use-cases/get-events.usecase';
import { EventController } from './presentation/controllers/event.controller';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27018/ms_eventos_db'),
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
  ],
  controllers: [EventController],
  providers: [
    {
      provide: 'EventRepository',
      useFactory: (eventModel) => new EventRepositoryImpl(eventModel),
      inject: [getModelToken('Event')],
    },
    {
      provide: CreateEventUseCase,
      useFactory: (eventRepo) => new CreateEventUseCase(eventRepo),
      inject: ['EventRepository'],
    },
    {
      provide: GetEventsUseCase,
      useFactory: (eventRepo) => new GetEventsUseCase(eventRepo),
      inject: ['EventRepository'],
    },
  ],
})
export class AppModule {}
