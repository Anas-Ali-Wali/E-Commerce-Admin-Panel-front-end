import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStyleComponent } from './card-style.component';

describe('CardStyleComponent', () => {
  let component: CardStyleComponent;
  let fixture: ComponentFixture<CardStyleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardStyleComponent]
    });
    fixture = TestBed.createComponent(CardStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
