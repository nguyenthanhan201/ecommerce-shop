import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule, GlobalHttpModule, RedisModule } from 'src/libs/common';
import { LogResponseMiddleware } from 'src/middlewares/logResponse.middleware';
import { ProductModule } from './product/product.module';
import { ScrapperModule } from './scrapper/scrapper.module';
import { SearchModule } from './search/search.module';

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
    SearchModule,
    ProductModule,
    ScrapperModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LogResponseMiddleware).forRoutes('*');
    // consumer.apply(RedisMiddleware).forRoutes(...routers);
  }
}
