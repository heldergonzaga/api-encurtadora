import { Test, TestingModule } from '@nestjs/testing';
import { CacheRepositoryImpl } from './cache-repository-impl';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

describe('CacheRepositoryImpl', () => {
  let cacheRepository: CacheRepositoryImpl;
  let cacheManagerMock: jest.Mocked<Cache>;

  beforeEach(async () => {
    // Criando um mock do cache manager
    cacheManagerMock = {
      set: jest.fn(),
      get: jest.fn(),
      del: jest.fn(),
      reset: jest.fn(),
      store: { keys: jest.fn() },
    } as unknown as jest.Mocked<Cache>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheRepositoryImpl,
        { provide: CACHE_MANAGER, useValue: cacheManagerMock },
      ],
    }).compile();

    cacheRepository = module.get<CacheRepositoryImpl>(CacheRepositoryImpl);
  });

  describe('setCacheKey', () => {
    it('should set a cache key', async () => {
      const key = 'testKey';
      const value = 'testValue';

      await cacheRepository.setCacheKey(key, value);

      // Verifica se o método set foi chamado corretamente
      expect(cacheManagerMock.set).toHaveBeenCalledWith(key, value);
    });
  });

  describe('getCacheKey', () => {
    it('should return the value of a cache key', async () => {
      const key = 'testKey';
      const value = 'testValue';

      cacheManagerMock.get.mockResolvedValue(value);

      const result = await cacheRepository.getCacheKey(key);

      expect(result).toBe(value);
      expect(cacheManagerMock.get).toHaveBeenCalledWith(key);
    });
  });

  describe('deleteCacheKey', () => {
    it('should delete a cache key', async () => {
      const key = 'testKey';

      await cacheRepository.deleteCacheKey(key);

      expect(cacheManagerMock.del).toHaveBeenCalledWith(key);
    });
  });

  describe('resetCache', () => {
    it('should reset the cache', async () => {
      await cacheRepository.resetCache();

      expect(cacheManagerMock.reset).toHaveBeenCalled();
    });
  });

  describe('cacheStore', () => {
    it('should return the cache store keys', async () => {
      const keys = ['testValue', 'testeValue2'];

      // Mocka o método keys da store
      jest.spyOn(cacheManagerMock.store, 'keys').mockResolvedValue(keys);

      const result = await cacheRepository.cacheStore();

      expect(result).toBe(keys);
      expect(cacheManagerMock.store.keys).toHaveBeenCalled();
    });
  });


});
