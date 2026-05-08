import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteSliderComponent } from './website-slider.component';

describe('WebsiteSliderComponent', () => {
  let component: WebsiteSliderComponent;
  let fixture: ComponentFixture<WebsiteSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebsiteSliderComponent]
    });
    fixture = TestBed.createComponent(WebsiteSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
