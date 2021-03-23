import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import * as fromIngredients from '@modules/ingredients/store';
import * as fromPizzas from '@modules/pizzas/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AddPizzaToppingComponent } from './add-pizza-topping.component';

describe('AddPizzaToppingComponent', () => {
  let component: AddPizzaToppingComponent;
  let fixture: ComponentFixture<AddPizzaToppingComponent>;
  let store: MockStore;
  let mockPizzasSelector: any;
  let mockIngredientsSelector: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MatSelectModule],
      declarations: [AddPizzaToppingComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideMockStore()],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    mockPizzasSelector = store.overrideSelector(fromPizzas.selectPizza, {
      id: 0,
      name: '',
      ingredients: [],
      ingredientsText: '',
    });
    mockIngredientsSelector = store.overrideSelector(
      fromIngredients.selectAllIngredients,
      []
    );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPizzaToppingComponent);
    component = fixture.componentInstance;
    component.pizza = { id: 0, name: '', ingredients: [], ingredientsText: '' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
