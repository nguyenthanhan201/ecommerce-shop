import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import slugify from 'slugify';
import { SearchService } from '../search/search.service';
import { ProductCreateDto } from './dto/productCreate.dto';
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

  async getAllProducts(): Promise<Product[]> {
    // this.cacheManager.set('key', 'hahahahaha');
    return this.productModel.find().exec();
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

  async getAllHideProducts(): Promise<Product[]> {
    return this.productModel
      .find({
        deletedAt: { $ne: null },
      })
      .exec();
  }

  async isSlugExists(slug: string): Promise<boolean> {
    const existingItem = await this.productModel.findOne({ slug }).exec();
    return !!existingItem;
  }

  async createProduct(productData: ProductCreateDto): Promise<Product> {
    const baseSlug = slugify(productData.title, { lower: true });
    let counter = 1;

    while (await this.isSlugExists(`${baseSlug}-${counter}`)) {
      counter++;
    }

    const slug = counter > 1 ? `${baseSlug}-${counter}` : baseSlug;
    const product = new this.productModel({ ...productData, slug });

    return product.save().then(
      (res) => {
        return res;
      },
      (error) => {
        console.log('Error creating product:', error);
        throw new HttpException(
          'Failed to create product',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      },
    );
  }
}
