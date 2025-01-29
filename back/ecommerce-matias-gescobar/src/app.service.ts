import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '¡Hola, bienvenido a mi primera app con NestJS!';
  }
}
