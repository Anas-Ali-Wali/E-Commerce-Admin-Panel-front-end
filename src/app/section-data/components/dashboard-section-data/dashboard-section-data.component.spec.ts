import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSectionDataComponent } from './dashboard-section-data.component';

describe('DashboardSectionDataComponent', () => {
  let component: DashboardSectionDataComponent;
  let fixture: ComponentFixture<DashboardSectionDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardSectionDataComponent]
    });
    fixture = TestBed.createComponent(DashboardSectionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
