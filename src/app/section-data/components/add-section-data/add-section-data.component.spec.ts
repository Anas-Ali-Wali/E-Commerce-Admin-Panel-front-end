import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSectionDataComponent } from './add-section-data.component';

describe('AddSectionDataComponent', () => {
  let component: AddSectionDataComponent;
  let fixture: ComponentFixture<AddSectionDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSectionDataComponent]
    });
    fixture = TestBed.createComponent(AddSectionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
