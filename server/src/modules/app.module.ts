import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { redisStore } from 'cache-manager-redis-store';
import * as Joi from 'joi';
import type { RedisClientOptions } from 'redis';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        // MONGODB_URI: Joi.string().required(),
        // PORT: Joi.number().required(),
      }),
      envFilePath: './src/.env',
    }),
    // config module redis
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get('CACHE_TTL'),
        store: (await redisStore({
          url: configService.get('REDIS_URL'),
        })) as any,
      }),
      inject: [ConfigService],
    }),
    // config module mongodb
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
        autoCreate: true,
      }),
      inject: [ConfigService],
    }),
    // MongooseModule.forRoot(
    //   'mongodb+srv://thanhan:12345@cluster0.vyrvsyr.mongodb.net/ecommerce',
    //   {
    //     autoCreate: true,
    //   },
    // ),

    ProductModule,
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
