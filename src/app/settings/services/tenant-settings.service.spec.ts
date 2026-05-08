import { TestBed } from '@angular/core/testing';

import { TenantSettingsService } from './tenant-settings.service';

describe('TenantSettingsService', () => {
  let service: TenantSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenantSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
