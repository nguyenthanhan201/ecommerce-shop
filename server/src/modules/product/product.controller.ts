import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  all() {
    return this.productService.all();
  }

  // @Get(':key')
  // getCache() {
  //   return this.productService.all();
  // }
}
