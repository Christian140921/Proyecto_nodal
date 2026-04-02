import { EventRepository } from '../../domain/repositories/event.repository';

export class DeleteEventUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(strapiId: number): Promise<void> {
    await this.eventRepository.deleteByStrapiId(strapiId);
  }
}
