import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobal } from './middlewares/logger.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

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
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
