import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { PizzaApiActions } from '@modules/pizzas/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { CreatePizzaButtonComponent } from './create-pizza-button.component';

describe('CreatePizzaButtonComponent', () => {
  let component: CreatePizzaButtonComponent;
  let fixture: ComponentFixture<CreatePizzaButtonComponent>;
  let dialogSpy: any;
  let store: MockStore;

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj('MatDialog', {
      open: { afterClosed: () => of() },
    });
    await TestBed.configureTestingModule({
      declarations: [CreatePizzaButtonComponent],
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
    fixture = TestBed.createComponent(CreatePizzaButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch a pizza add action when the value is defined', () => {
    const spy = spyOn(store, 'dispatch').and.returnValue();
    dialogSpy.open.and.returnValue({ afterClosed: () => of({ name: 'test' }) });
    component.onAdd();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      PizzaApiActions.addPizza({ pizza: { name: 'test' } })
    );
  });

  it('should not dispatch a pizza add action when the value is und=defined', () => {
    const spy = spyOn(store, 'dispatch').and.returnValue();
    dialogSpy.open.and.returnValue({ afterClosed: () => of(undefined) });
    component.onAdd();
    expect(spy).not.toHaveBeenCalled();
  });
});
