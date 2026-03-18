import { Controller, Get, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateEventUseCase } from '../../application/use-cases/create-event.usecase';
import { GetEventsUseCase } from '../../application/use-cases/get-events.usecase';

@Controller('events')
export class EventController {
  constructor(
    private readonly createEventUseCase: CreateEventUseCase,
    private readonly getEventsUseCase: GetEventsUseCase,
  ) {}

  @Get()
  async findAll() {
    const events = await this.getEventsUseCase.getAll();
    return { success: true, data: events };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const event = await this.getEventsUseCase.getById(id);
    return { success: true, data: event };
  }

  @MessagePattern({ cmd: 'sync_event' })
  async syncEvent(@Payload() data: any) {
    console.log('[Event MS] 📥 Recibido evento de Strapi:', JSON.stringify(data, null, 2));
    try {
      await this.createEventUseCase.execute(data);
      console.log('[Event MS] ✅ Evento procesado y guardado correctamente');
      return { success: true };
    } catch (error) {
      console.error('[Event MS] ❌ Error procesando evento:', error.stack || error.message);
      return { success: false, error: error.message };
    }
  }
}
