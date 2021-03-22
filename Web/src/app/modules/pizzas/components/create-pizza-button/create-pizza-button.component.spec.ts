import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePizzaButtonComponent } from './create-pizza-button.component';

describe('CreatePizzaButtonComponent', () => {
  let component: CreatePizzaButtonComponent;
  let fixture: ComponentFixture<CreatePizzaButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePizzaButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePizzaButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
