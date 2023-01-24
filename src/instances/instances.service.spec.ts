import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  mockCreateInstanceInput,
  mockInstanceModel,
} from '../common/test/TestUtil';
import { Instance } from './entities/instance.entity';
import { InstancesService } from './instances.service';

describe('InstancesService', () => {
  let service: InstancesService;

  const mockRepository = {
    find: jest.fn().mockReturnValue({}),
    findOne: jest.fn().mockReturnValue({}),
    create: jest.fn().mockReturnValue(mockInstanceModel),
    save: jest.fn().mockReturnValue({}),
    update: jest.fn().mockReturnValue({}),
    delete: jest.fn().mockReturnValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstancesService,
        {
          provide: getRepositoryToken(Instance),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<InstancesService>(InstancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('When Create Instance', () => {
    it('Should Create Instance', () => {
      const createdInstance = service.create(mockCreateInstanceInput);
      expect(createdInstance).resolves.toContain(mockCreateInstanceInput);
    });
  });
  describe('When List Instances', () => {
    it('Should List Instances', () => {
      const myInstances = service.findAllByOwner(
        mockCreateInstanceInput.ownerId,
      );
      expect(myInstances).resolves.toContain(mockCreateInstanceInput);
    });
  });
});
