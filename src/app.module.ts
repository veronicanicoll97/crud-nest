import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongoDbDriverModule } from 'nest-mongodb-driver';

@Module({
  imports: [
    ProductModule,
    MongoDbDriverModule.forRoot({
      url: 'mongodb+srv://<user>:<pass>@nest-prueba.lbzh8ze.mongodb.net/?retryWrites=true&w=majority&appName=nest-prueba',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
