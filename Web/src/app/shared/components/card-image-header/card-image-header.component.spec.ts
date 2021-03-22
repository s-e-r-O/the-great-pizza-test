import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardImageHeaderComponent } from './card-image-header.component';

describe('CardImageHeaderComponent', () => {
  let component: CardImageHeaderComponent;
  let fixture: ComponentFixture<CardImageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardImageHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardImageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
