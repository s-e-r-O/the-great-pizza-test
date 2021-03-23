import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { PizzaApiActions } from '@modules/pizzas/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { PizzaHeaderComponent } from './pizza-header.component';

describe('PizzaHeaderComponent', () => {
  let component: PizzaHeaderComponent;
  let fixture: ComponentFixture<PizzaHeaderComponent>;
  let dialogSpy: any;
  let store: MockStore;

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj('MatDialog', {
      open: { afterClosed: () => of() },
    });
    await TestBed.configureTestingModule({
      declarations: [PizzaHeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideMockStore(),
        {
          provide: MatDialog,
          useValue: dialogSpy,
        },
      ],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaHeaderComponent);
    component = fixture.componentInstance;
    component.pizza = { id: 0, name: '', ingredients: [], ingredientsText: '' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch a pizza update action when the value is defined', () => {
    component.pizza = { id: 1, name: '', ingredients: [], ingredientsText: '' };
    const spy = spyOn(store, 'dispatch').and.returnValue();
    dialogSpy.open.and.returnValue({
      afterClosed: () => of({ name: 'test' }),
    });
    component.onEdit();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      PizzaApiActions.updatePizza({
        pizza: {
          id: 1,
          name: 'test',
          ingredients: [],
        } as any,
      })
    );
  });

  it('should not dispatch a pizza update action when the value is und=defined', () => {
    const spy = spyOn(store, 'dispatch').and.returnValue();
    dialogSpy.open.and.returnValue({ afterClosed: () => of(undefined) });
    component.onEdit();
    expect(spy).not.toHaveBeenCalled();
  });
});
