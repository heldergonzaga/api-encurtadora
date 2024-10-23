import { AppController } from './app.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { CacheRepository } from './repositories/cache-repository';
import { EncurtadoraRepository } from './repositories/encurtadora-repository';
import { CacheInterceptor, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Reflector } from '@nestjs/core';
import { CreateEncurtadoraDTO } from './dto/CreateEncurtadora';

describe('AppController', () => {
  let appController: AppController;
  let encurtadoraRepository: EncurtadoraRepository;
  let cacheRepository: CacheRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: EncurtadoraRepository,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: CacheRepository,
          useValue: {
            setCacheKey: jest.fn(),
            getCacheKey: jest.fn(),
            deleteCacheKey: jest.fn(),
            resetCache: jest.fn(),
            cacheStore: jest.fn(),
          },
        },
        {
          provide: CACHE_MANAGER, // Mock do CACHE_MANAGER
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
          },
        },
        Reflector, // Fornecendo Reflector
        CacheInterceptor, // Fornecendo CacheInterceptor para ser usado nos testes
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    encurtadoraRepository = module.get<EncurtadoraRepository>(
      EncurtadoraRepository,
    );
    cacheRepository = module.get<CacheRepository>(CacheRepository);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('findMany', () => {
    it('should return all encurtadoras', async () => {
      const result = [{ id: 1, term_origin: 'test', term_target: 'target' }];

      // Use a instância injetada de encurtadoraRepository, não a classe
      jest.spyOn(encurtadoraRepository, 'findAll').mockResolvedValue(result);

      expect(await appController.findMany()).toBe(result);
    });
  });

  describe('createEncurtadora', () => {
    it('should create a new encurtadora', async () => {
      const createDto: CreateEncurtadoraDTO = {
        term_origin: 'test',
        term_target: 'target',
      };
      const result: any = { id: 1, ...createDto };

      jest.spyOn(encurtadoraRepository, 'create').mockResolvedValue(result);

      expect(await appController.createEncurtadora(createDto)).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return one encurtadora', async () => {
      const createDto: CreateEncurtadoraDTO = {
        term_origin: 'test',
        term_target: 'target',
      };
      const result: any = { id: 1, ...createDto };

      jest.spyOn(encurtadoraRepository, 'findOne').mockResolvedValue(result);

      expect(await appController.findOne('test')).toBe(result);
    });
  });

  describe('update', () => {
    it('should update an encurtadora', async () => {
      const updateDto: CreateEncurtadoraDTO = {
        term_origin: 'test',
        term_target: 'new_target',
      };
      const result = { id: 1, ...updateDto };
      jest.spyOn(encurtadoraRepository, 'update').mockResolvedValue(result);

      expect(await appController.update('1', updateDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove an encurtadora', async () => {
      const result = { success: true };

      jest.spyOn(encurtadoraRepository, 'remove').mockResolvedValue(result);

      expect(await appController.remove('1')).toBe(result);
    });
  });

  describe('setCacheKey', () => {
    it('should set a cache key', async () => {
      const result = {
        success: true,
        status: 201,
        message: 'Key cached successfully',
      };

      jest.spyOn(cacheRepository, 'setCacheKey').mockResolvedValue(undefined);

      expect(await appController.setCacheKey('testKey', 'testValue')).toEqual(
        result,
      );
    });
  });

  describe('getCacheKey', () => {
    it('should return a cache key', async () => {
      const result = 'testValue';
      jest.spyOn(cacheRepository, 'getCacheKey').mockResolvedValue(result);

      expect(await appController.getCacheKey('testKey')).toEqual({
        success: true,
        status: 200,
        data: result,
      });
    });
  });

  describe('deleteCacheKey', () => {
    it('should delete a cache key', async () => {
      const result = {
        success: true,
        status: 201,
        message: 'Key deleted successfully',
      };

      jest
        .spyOn(cacheRepository, 'deleteCacheKey')
        .mockResolvedValue(undefined);

      expect(await appController.deleteCacheKey('testKey')).toEqual(result);
    });
  });

  describe('resetCache', () => {
    it('should reset the cache', async () => {
      const result = {
        success: true,
        status: 200,
        message: 'Cache cleared successfully',
      };

      jest.spyOn(cacheRepository, 'resetCache').mockResolvedValue(undefined);

      expect(await appController.resetCache()).toEqual(result);
    });
  });

  describe('cacheStore', () => {
    it('should return the cache store', async () => {
      const result = ['testValue'];
      jest.spyOn(cacheRepository, 'cacheStore').mockResolvedValue(result);

      expect(await appController.cacheStore()).toEqual({
        success: true,
        status: 200,
        data: result,
      });
    });
  });
});
