import { PrismaEncurtadoraRepository } from './repositories/prisma/prisma-encurtadora-repository';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { EncurtadoraRepository } from './repositories/encurtadora-repository';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheRepositoryImpl } from './repositories/cache-manager/cache-repository-impl';
import { CacheRepository } from './repositories/cache-repository';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      max: 100,
      ttl: 0,
      isGlobal: true,
      store: redisStore,
      port: 6379,
      host: 'localhost',
      db: 2,
      user: 'default',
      password: 'root',
    }),
  ],
  controllers: [AppController],
  providers: [
    PrismaService,
    {
      provide: EncurtadoraRepository,
      useClass: PrismaEncurtadoraRepository,
    },
    {
      provide: CacheRepository,
      useClass: CacheRepositoryImpl,
    },
  ],
})
export class AppModule {}
