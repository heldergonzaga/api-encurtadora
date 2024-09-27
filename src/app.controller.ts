import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateEncurtadoraDTO } from './dto/CreateEncurtadora';
import { EncurtadoraRepository } from './repositories/encurtadora-repository';

@Controller()
export class AppController {
  constructor(private encurtadoraRepository: EncurtadoraRepository) {}

  @Get()
  findMany() {
    return this.encurtadoraRepository.findAll();
  }

  @Post()
  async createEncurtadora(@Body() body: CreateEncurtadoraDTO) {
    const { term_origin, term_target } = body;
    return this.encurtadoraRepository.create(term_origin, term_target);
  }

  @Get(':term_origin')
  findOne(@Param('term_origin') term_origin: string) {
    return this.encurtadoraRepository.findOne(term_origin);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() createEncurtadoraDTO: CreateEncurtadoraDTO,
  ) {
    return this.encurtadoraRepository.update(id, createEncurtadoraDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.encurtadoraRepository.remove(id);
  }
}
