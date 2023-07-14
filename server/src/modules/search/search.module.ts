import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from './search.service';

@Module({
  imports: [
    ConfigModule,
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTIC_NODE'),
        maxRetries: 10,
        requestTimeout: 60000,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [ElasticsearchModule, SearchService],
  providers: [SearchService],
})
export class SearchModule implements OnModuleInit {
  constructor(private readonly searchService: SearchService) {}

  public async onModuleInit() {
    await this.searchService.createIndex();
  }
}
