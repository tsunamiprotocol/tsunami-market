import { TestBed } from '@angular/core/testing';

import { ChainlinkService } from './chainlink.service';

describe('ChainlinkService', () => {
  let service: ChainlinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChainlinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
