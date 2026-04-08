import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCategoryComponent } from './dashboard-category.component';

describe('DashboardCategoryComponent', () => {
  let component: DashboardCategoryComponent;
  let fixture: ComponentFixture<DashboardCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardCategoryComponent]
    });
    fixture = TestBed.createComponent(DashboardCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
