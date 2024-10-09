import { PrismaEncurtadoraRepository } from './repositories/prisma/prisma-encurtadora-repository';
import { ArgumentsHost, Catch, ExceptionFilter, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { EncurtadoraRepository } from './repositories/encurtadora-repository';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheRepositoryImpl } from './repositories/cache-manager/cache-repository-impl';
import { CacheRepository } from './repositories/cache-repository';
import * as redisStore from 'cache-manager-redis-store';
import { APP_FILTER } from '@nestjs/core';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = exception.getStatus ? exception.getStatus() : 500;
    const message = exception.message || 'Erro interno do servidor';
    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}

@Module({
  imports: [
    CacheModule.register({
      max: 100,
      ttl: 0,
      isGlobal: true,
      store: redisStore,
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      user: process.env.REDIS_USER,
      password: process.env.REDIS_PASSWORD,
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
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
