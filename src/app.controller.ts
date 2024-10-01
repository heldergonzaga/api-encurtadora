import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateEncurtadoraDTO } from './dto/CreateEncurtadora';
import { EncurtadoraRepository } from './repositories/encurtadora-repository';
import { CacheRepository } from './repositories/cache-repository';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';

@Controller()
export class AppController {
  constructor(
    private encurtadoraRepository: EncurtadoraRepository,
    private cacheRepository: CacheRepository,
  ) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('allencurtadoras')
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

  @Post('/cache')
  async setCacheKey(@Query('key') key: string, @Query('value') value: string) {
    await this.cacheRepository.setCacheKey(key, value);
    return {
      success: true,
      status: 201,
      message: 'Key cached successfully',
    };
  }

  @Get('/cache/get/:key')
  async getCacheKey(@Param('key') key: string) {
    const data = await this.cacheRepository.getCacheKey(key);
    return {
      success: true,
      status: 200,
      data,
    };
  }

  @Delete('/cache/:key')
  async deleteCacheKey(@Param('key') key: string) {
    await this.cacheRepository.deleteCacheKey(key);
    return {
      success: true,
      status: 201,
      message: 'Key deleted successfully',
    };
  }

  @Get('/cache/reset')
  async resetCache() {
    await this.cacheRepository.resetCache();
    return {
      success: true,
      status: 200,
      message: 'Cache cleared successfully',
    };
  }

  @Get('/cache/store')
  async cacheStore() {
    const store = await this.cacheRepository.cacheStore();
    return {
      success: true,
      status: 200,
      data: store,
    };
  }
}
