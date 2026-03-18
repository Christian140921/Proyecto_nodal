import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  // Aplicación Híbrida: HTTP para el Frontend (3002) + TCP para Strapi (4002)
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 4002,
    },
  });
  
  await app.startAllMicroservices();
  await app.listen(3002);
  console.log('Microservicio de EVENTOS híbrido corriendo:');
  console.log('- TCP (Sincronización Strapi): puerto 4002');
  console.log('- HTTP (Queries Frontend): puerto 3002');
}
bootstrap();
