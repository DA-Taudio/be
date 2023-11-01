import { Test, TestingModule } from '@nestjs/testing';
import { ProtoSchemaService } from './proto-schema.service';

describe('ProtoSchemaService', () => {
  let service: ProtoSchemaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProtoSchemaService],
    }).compile();

    service = module.get<ProtoSchemaService>(ProtoSchemaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
