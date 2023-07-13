import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async all(): Promise<Product[]> {
    const oki = this.cacheManager.set('oki', 'oki', 10000);
    console.log('👌  oki:', oki);
    return this.productModel.find().exec();
  }
}
