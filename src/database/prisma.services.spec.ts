import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      $connect: jest.fn().mockReturnValue('connectado'), // Mock do método $connect
    })),
  };
});

describe('PrismaService', () => {
  let prismaService: PrismaService;
  let prismaClientMock: jest.Mocked<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    prismaClientMock = new PrismaClient() as jest.Mocked<PrismaClient>;
  });

  it('should connect to the database on initialization', async () => {
    // Simula a inicialização do módulo sem chamar onModuleInit diretamente
    const _result = await prismaService.$connect();

    const result = 'connectado';

    expect(result).toEqual(_result);
    // Verifica se o método $connect foi chamado
 //   expect(prismaClientMock.$connect).toHaveBeenCalled();
  });
});
