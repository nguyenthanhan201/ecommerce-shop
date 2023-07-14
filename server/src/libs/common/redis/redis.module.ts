import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';

@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        ({
          store: redisStore,
          url: configService.get<string>('REDIS_URI'),
        } as RedisClientOptions),
      inject: [ConfigService],
    }),
  ],
})
export class RedisModule {}
