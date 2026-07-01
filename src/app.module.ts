import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no hay que importarlo en cada módulo
      validate, // corre la función de validación al arrancar
    }),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
