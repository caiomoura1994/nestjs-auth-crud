import { Test, TestingModule } from '@nestjs/testing';
import { PurchasesResolver } from './purchases.resolver';
import { PurchasesService } from './purchases.service';

describe('PurchasesResolver', () => {
  let resolver: PurchasesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchasesResolver, PurchasesService],
    }).compile();

    resolver = module.get<PurchasesResolver>(PurchasesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
