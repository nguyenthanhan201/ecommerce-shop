import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductSchema } from './product.model';
import { ProductService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    // HttpModule.register({
    //   timeout: 5000,
    //   maxRedirects: 5,
    // }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
