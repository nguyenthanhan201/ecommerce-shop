import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private httpService: HttpService,
  ) {}

  @Get()
  all() {
    return this.productService.all();
  }

  @Get('getAllProducts/:key')
  async getAllProducts() {
    return this.httpService
      .get('https://fakestoreapi.com/products')
      .toPromise()
      .then((res) => res.data);
  }

  @Get('test')
  async getTest() {
    return this.httpService
      .get('https://jsonplaceholder.typicode.com/todos')
      .toPromise()
      .then((res) => res.data);
  }
}
