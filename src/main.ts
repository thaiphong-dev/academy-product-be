import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Your API')
    .setDescription('API documentation for the Your Project')
    .setVersion('1.0')
    .addBearerAuth() // Add Bearer token authentication if needed
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 'api' is the URL prefix for Swagger UI

  await app.listen(3000);
}

bootstrap();
