import { TestBed } from '@angular/core/testing';

import { AnalystcsService } from './analystcs.service';

describe('AnalystcsService', () => {
  let service: AnalystcsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalystcsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
