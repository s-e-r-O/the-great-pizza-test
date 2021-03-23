import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { PizzaComponent } from './pizza.component';
import * as fromPizzas from '@modules/pizzas/store';

describe('PizzaComponent', () => {
  let component: PizzaComponent;
  let fixture: ComponentFixture<PizzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PizzaComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [NoopAnimationsModule, RouterTestingModule],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: fromPizzas.selectPizza,
              value: { id: 0, name: '', ingredients: [] },
            },
          ],
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
