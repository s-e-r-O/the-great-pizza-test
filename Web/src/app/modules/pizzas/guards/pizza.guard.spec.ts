import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PizzaApiActions } from '../store';
import { PizzaGuard } from './pizza.guard';

describe('PizzaGuard', () => {
  let guard: PizzaGuard;
  let store: MockStore;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [provideMockStore()],
    });
    guard = TestBed.inject(PizzaGuard);
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect to /pizzas if id is not correct', () => {
    const spy = spyOn(router, 'parseUrl').and.callThrough();
    const result = guard.canActivate(
      { params: {} } as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );
    expect(result).toBeInstanceOf(UrlTree);
    expect(spy).toHaveBeenCalledWith('/pizzas');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should load a pizza if id is correct', () => {
    const spy = spyOn(store, 'dispatch').and.returnValue();
    const result = guard.canActivate(
      { params: { id: '0' } } as any,
      {} as RouterStateSnapshot
    );
    expect(result).toBeTrue();
    expect(spy).toHaveBeenCalledWith(PizzaApiActions.loadPizza({ pizzaId: 0 }));
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
