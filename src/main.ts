import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as CookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.use(CookieParser())
  
  const config = new DocumentBuilder()
    .setTitle('Nest blog API')
    .setDescription('The blog api info')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: "bearer",
        bearerFormat: "JWT"
      },
      "Authorization",
    )
  
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3500);
  
}
bootstrap();
