import { TestBed } from '@angular/core/testing';

import { HomeConfigService } from './home-config.service';

describe('HomeConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeConfigService = TestBed.get(HomeConfigService);
    expect(service).toBeTruthy();
  });
});
