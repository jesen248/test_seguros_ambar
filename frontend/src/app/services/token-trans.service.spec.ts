import { TestBed } from '@angular/core/testing';

import { TokenTransService } from './token-trans.service';

describe('TokenTransService', () => {
  let service: TokenTransService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenTransService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
