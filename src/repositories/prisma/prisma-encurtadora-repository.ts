import { CreateEncurtadoraDTO } from './../../dto/CreateEncurtadora';
import { PrismaService } from './../../database/prisma.service';
import { EncurtadoraRepository } from '../encurtadora-repository';
import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaEncurtadoraRepository implements EncurtadoraRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(term_origin: string): Promise<void> {
    const _encExists = await this.prisma.encurtadora.findFirst({
      where: {
        term_origin: term_origin,
      },
    });

    if (!_encExists) {
      throw new Error('termo de entrada encurtadora ou redirect já existente!');
    }
  }

  async create(term_origin: string, term_target: string): Promise<void> {
    const _encExists = await this.prisma.encurtadora.findFirst({
      where: {
        term_origin: term_origin,
      },
    });

    if (_encExists) {
      throw new Error('termo de entrada encurtadora ou redirect já existente!');
    }

    await this.prisma.encurtadora.create({
      data: {
        id: randomUUID(),
        term_origin,
        term_target,
      },
    });
  }

  async update(id: string, data: CreateEncurtadoraDTO) {
    const _encExists = await this.prisma.encurtadora.findUnique({
      where: {
        id: id,
      },
    });

    if (!_encExists) {
      throw new Error('Encurtadora inexistente');
    }

    return await this.prisma.encurtadora.update({
      data,
      where: {
        id,
      },
    });
  }



  async findAll() {
    return this.prisma.encurtadora.findMany();
  }

  

  async remove(id: string) {
    const _encExists = await this.prisma.encurtadora.findUnique({
      where: {
        id: id,
      },
    });

    if (!_encExists) {
      throw new Error('Encurtadora Inexistente');
    }

    return await this.prisma.encurtadora.delete({
      where: {
        id,
      },
    });
  }
}
