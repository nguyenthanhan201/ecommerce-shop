import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductCreateDto } from './dto/productCreate.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('getAllProducts')
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('hide')
  getAllHideProducts() {
    return this.productService.getAllHideProducts();
  }

  @Post('store')
  createProduct(@Body() body: ProductCreateDto) {
    return this.productService.createProduct(body);
  }
}
