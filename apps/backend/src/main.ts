import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não definidas no DTO
      transform: true, // Transforma os dados para os tipos corretos
      forbidNonWhitelisted: true, // Rejeita requisições com propriedades não definidas
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
