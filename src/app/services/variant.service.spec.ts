import { TestBed } from '@angular/core/testing';

import { VariantService } from './variant.service';

describe('VariantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VariantService = TestBed.get(VariantService);
    expect(service).toBeTruthy();
  });
});
