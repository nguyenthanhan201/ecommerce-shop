import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { routers } from 'src/constants/getRedisCacheRouters';
import { DatabaseModule, GlobalHttpModule, RedisModule } from 'src/libs/common';
import { LogResponseMiddleware } from 'src/middlewares/logResponse.middleware';
import { RedisMiddleware } from 'src/middlewares/redis.middleware';
import { ProductModule } from './product/product.module';
import { ScrapperModule } from './scrapper/scrapper.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        // MONGODB_URI: Joi.string().required(),
        // PORT: Joi.number().required(),
      }),
      envFilePath: '.env',
    }),
    GlobalHttpModule,
    RedisModule,
    DatabaseModule,
    ProductModule,
    ScrapperModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LogResponseMiddleware).forRoutes('*');
    consumer.apply(RedisMiddleware).forRoutes(...routers);
  }
}
