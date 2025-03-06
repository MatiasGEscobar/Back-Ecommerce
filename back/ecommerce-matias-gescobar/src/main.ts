import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobal } from './middlewares/logger.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(LoggerGlobal);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    exceptionFactory: ((errors) => {
      const clearError = errors.map((error) => {
        return {property: error.property, constraints: error.constraints}
      })
      return new BadRequestException({
        alert:"Errors has been detected, this are:",
        errors: clearError
      })
    })
  }))

  const swaggerConfig = new DocumentBuilder()
  .setTitle('Demo Ecommerce')
  .setDescription('Esta es una Api construida con Nest JS para ser empleada en las demos de un proyecto de ecommerce de backend')
  .setVersion('1.0')
  .addBearerAuth().build();

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)
  await app.listen(process.env.PORT ?? 3000);
}


bootstrap();
