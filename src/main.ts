import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './helpers/error-handling';
import { winstonConfig } from './helpers/winston-logging';
import { WinstonModule } from 'nest-winston';

async function start() {
  try {
    const PORT = process.env.API_PORT || 3033;
    console.log(PORT);

    const app = await NestFactory.create(AppModule, {
      logger: WinstonModule.createLogger(winstonConfig)
    });
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');
    app.useGlobalFilters(new AllExceptionsFilter())

    const config = new DocumentBuilder()
      .setTitle('Ehson project')
      .setDescription('Ehson project REST API')
      .setVersion('1.0')
      .addTag(
        'NESTJS, validation, swagger, guard, pg, mailer, bot, sms, deploy-server, OTP',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    await app.listen(PORT, () => {
      console.log(`Server started at: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
