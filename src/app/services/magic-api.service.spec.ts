import { TestBed } from '@angular/core/testing';

import { MagicApiService } from './magic-api.service';

describe('MagicApiService', () => {
  let service: MagicApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagicApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
