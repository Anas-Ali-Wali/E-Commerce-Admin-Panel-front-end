import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeChangesComponent } from './theme-changes.component';

describe('ThemeChangesComponent', () => {
  let component: ThemeChangesComponent;
  let fixture: ComponentFixture<ThemeChangesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemeChangesComponent]
    });
    fixture = TestBed.createComponent(ThemeChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
