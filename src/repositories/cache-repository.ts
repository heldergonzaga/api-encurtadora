import { CreateEncurtadoraDTO } from 'src/dto/CreateEncurtadora';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export abstract class CacheRepository {
  abstract setCacheKey(key: string, value: string): Promise<void>;
  abstract getCacheKey(key: string): Promise<string>;
  abstract deleteCacheKey(key: string): Promise<void>;
  abstract resetCache(): Promise<void>;
  abstract cacheStore(): Promise<string[]>;
}
