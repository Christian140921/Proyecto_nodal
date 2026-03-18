import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Aplicación Híbrida: HTTP para el Frontend + TCP para Strapi
  const app = await NestFactory.create(AppModule);
  
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0', // Escuchar en todas las interfaces (Docker friendly)
      port: 4001,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3001); // Puerto HTTP para que el Frontend nos consulte
  console.log('Microservicio de NOTICIAS híbrido corriendo:');
  console.log('- TCP (Sincronización Strapi): puerto 4001');
  console.log('- HTTP (Queries Frontend): puerto 3001');
}
bootstrap();
