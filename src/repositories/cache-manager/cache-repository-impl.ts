import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheRepository } from '../cache-repository';

@Injectable()
export class CacheRepositoryImpl implements CacheRepository {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setCacheKey(key: string, value: string): Promise<void> {
    await this.cacheManager.set(key, value);
  }

  async getCacheKey(key: string): Promise<string> {
    return await this.cacheManager.get(key);
  }

  async deleteCacheKey(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async resetCache(): Promise<void> {
    await this.cacheManager.reset();
  }

  async cacheStore(): Promise<string[]> {
    return await this.cacheManager.store.keys();
  }
}
