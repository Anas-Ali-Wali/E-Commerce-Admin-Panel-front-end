import { TestBed } from '@angular/core/testing';

import { TenantIntegrationService } from './tenant-integration.service';

describe('TenantIntegrationService', () => {
  let service: TenantIntegrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenantIntegrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
