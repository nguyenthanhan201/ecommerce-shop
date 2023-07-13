import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import * as redisStore from 'cache-manager-redis-store';
import { ProductController } from './product.controller';
import { ProductSchema } from './product.model';
import { ProductService } from './product.service';

@Module({
  imports: [
    // CacheModule.registerAsync<RedisClientOptions>({
    //   isGlobal: true,
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     ttl: configService.get('CACHE_TTL'),
    //     store: (await redisStore({
    //       url: configService.get('REDIS_URL'),
    //     })) as any,
    //   }),
    //   inject: [ConfigService],
    // }),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
// redis://:PZw4CYoXzVW5Lj5hvzLVazPq8xQoOM8w@redis-15722.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:15722
