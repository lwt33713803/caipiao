import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiResponseInterceptor } from './common/interceptors/api-response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ApiResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Shop')
    .setDescription('商城接口')
    .setVersion('1.0')
    .addTag('dev')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/doc', app, document);

  await app.listen(3001);
}
bootstrap();
