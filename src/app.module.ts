import { PrismaEncurtadoraRepository } from './repositories/prisma/prisma-encurtadora-repository';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { EncurtadoraRepository } from './repositories/encurtadora-repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    PrismaService,
    {
      provide: EncurtadoraRepository,
      useClass: PrismaEncurtadoraRepository,
    },
  ],
})
export class AppModule {}
