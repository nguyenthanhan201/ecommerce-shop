import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import { SearchService } from '../search/search.service';
import { Product, ProductDocument } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private httpService: HttpService,
    private readonly searchService: SearchService,
  ) {}

  async all(): Promise<Product[]> {
    // this.cacheManager.set('key', 'hahahahaha');
    // return this.productModel.find().exec();
    return this.httpService
      .get('https://jsonplaceholder.typicode.com/todos')
      .toPromise()
      .then(async (res) => {
        // await res.data.forEach(async (element) => {
        //   await this.searchService.indexPost(element);
        // });
        return res.data;
      });
  }
}
