import { Test, TestingModule } from '@nestjs/testing';
import { PrismaEncurtadoraRepository } from './prisma-encurtadora-repository';
import { PrismaService } from './../../database/prisma.service';
import { CreateEncurtadoraDTO } from './../../dto/CreateEncurtadora';

describe('PrismaEncurtadoraRepository', () => {
  let repository: PrismaEncurtadoraRepository;
  let prisma: PrismaService;

  const mockPrismaService = {
    encurtadora: {
      findFirst: jest.fn(),
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaEncurtadoraRepository,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    repository = module.get<PrismaEncurtadoraRepository>(
      PrismaEncurtadoraRepository,
    );
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findOne', () => {
    it('should throw an error if term_origin does not exist', async () => {
      jest.spyOn(prisma.encurtadora, 'findFirst').mockResolvedValueOnce(null);

      await expect(repository.findOne('example')).rejects.toThrow(
        'termo de entrada encurtadora ou redirect já existente!',
      );
    });

    it('should not throw an error if term_origin exists', async () => {
      // Adicione todos os campos esperados no objeto retornado
      jest.spyOn(prisma.encurtadora, 'findFirst').mockResolvedValueOnce({
        id: 'some-uuid',
        term_origin: 'example',
        term_target: 'target-url',
      });

      await expect(repository.findOne('example')).resolves.not.toThrow();
    });
  });

  describe('create', () => {
    it('should throw an error if term_origin already exists', async () => {
      jest.spyOn(prisma.encurtadora, 'findFirst').mockResolvedValueOnce({
        id: 'some-uuid',
        term_origin: 'example',
        term_target: 'target-url',
      });

      await expect(repository.create('example', 'target')).rejects.toThrow(
        'termo de entrada encurtadora ou redirect já existente!',
      );
    });

    it('should create a new encurtadora if term_origin does not exist', async () => {
      jest.spyOn(prisma.encurtadora, 'findFirst').mockResolvedValueOnce(null);
      jest.spyOn(prisma.encurtadora, 'create').mockResolvedValueOnce({
        id: 'uuid',
        term_origin: 'example',
        term_target: 'target',
      });

      await expect(
        repository.create('example', 'target'),
      ).resolves.not.toThrow();
      expect(prisma.encurtadora.create).toHaveBeenCalledWith({
        data: {
          id: expect.any(String),
          term_origin: 'example',
          term_target: 'target',
        },
      });
    });
  });

  describe('update', () => {
    it('should throw an error if encurtadora does not exist', async () => {
      jest.spyOn(prisma.encurtadora, 'findUnique').mockResolvedValueOnce(null);

      const updateData: CreateEncurtadoraDTO = {
        term_origin: 'updatedOrigin',
        term_target: 'updatedTarget',
      };

      await expect(
        repository.update('non-existent-id', updateData),
      ).rejects.toThrow('Encurtadora inexistente');
    });

    it('should update an encurtadora if it exists', async () => {
      jest.spyOn(prisma.encurtadora, 'findUnique').mockResolvedValueOnce({
        id: 'some-uuid',
        term_origin: 'example',
        term_target: 'target-url',
      });
      jest.spyOn(prisma.encurtadora, 'update').mockResolvedValueOnce({
        id: 'uuid',
        term_origin: 'updatedOrigin',
        term_target: 'updatedTarget',
      });

      const updateData: CreateEncurtadoraDTO = {
        term_origin: 'updatedOrigin',
        term_target: 'updatedTarget',
      };

      await expect(
        repository.update('uuid', updateData),
      ).resolves.not.toThrow();
      expect(prisma.encurtadora.update).toHaveBeenCalledWith({
        data: updateData,
        where: { id: 'uuid' },
      });
    });
  });

  describe('findAll', () => {
    it('should return all encurtadoras', async () => {
      const encurtadoras = [
        { id: 'uuid1', term_origin: 'origin1', term_target: 'target1' },
      ];
      jest
        .spyOn(prisma.encurtadora, 'findMany')
        .mockResolvedValueOnce(encurtadoras);

      await expect(repository.findAll()).resolves.toEqual(encurtadoras);
    });
  });

  describe('remove', () => {
    it('should throw an error if encurtadora does not exist', async () => {
      jest.spyOn(prisma.encurtadora, 'findUnique').mockResolvedValueOnce(null);

      await expect(repository.remove('non-existent-id')).rejects.toThrow(
        'Encurtadora Inexistente',
      );
    });

    it('should delete an encurtadora if it exists', async () => {
      jest.spyOn(prisma.encurtadora, 'findUnique').mockResolvedValueOnce({
        id: 'some-uuid',
        term_origin: 'example',
        term_target: 'target-url',
      });
      jest.spyOn(prisma.encurtadora, 'delete').mockResolvedValueOnce({
        id: 'some-uuid',
        term_origin: 'example',
        term_target: 'target-url',
      });

      await expect(repository.remove('uuid')).resolves.not.toThrow();
      expect(prisma.encurtadora.delete).toHaveBeenCalledWith({
        where: { id: 'uuid' },
      });
    });
  });
});
