import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/users.entity';
import { Product } from './entities/products.entity';
import { Category } from './entities/categories.entity';
import { Order } from './entities/orders.entity';
import { OrderDetail } from './entities/orderDetails.entity';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath:'./.env'
  }),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (ConfigService: ConfigService) => ({
      type:'postgres',
      database: ConfigService.get('DB_NAME'),
      host: ConfigService.get('DB_HOST'),
      port: ConfigService.get('DB_PORT'),
      username: ConfigService.get('DB_USERNAME'),
      password: ConfigService.get('DB_PASSWORD'),
      entities:[User,Product,Category,Order,OrderDetail],
      synchronize: true,
      logging: true
    })
  }),
  CategoriesModule, ProductsModule, UsersModule, AuthModule, OrdersModule, CloudinaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
