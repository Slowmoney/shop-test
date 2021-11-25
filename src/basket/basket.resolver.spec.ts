import { Test, TestingModule } from '@nestjs/testing';
import { BasketResolver } from './basket.resolver';

describe('BasketResolver', () => {
  let resolver: BasketResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasketResolver],
    }).compile();

    resolver = module.get<BasketResolver>(BasketResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
