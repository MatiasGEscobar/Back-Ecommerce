import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
    providers:[UsersService],
    controllers:[UsersController]
})
export class UsersModule{}
