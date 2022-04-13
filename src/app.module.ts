import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://inaboya:1234567890@week9.jatjx.mongodb.net/eCommerce-db?retryWrites=true',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
