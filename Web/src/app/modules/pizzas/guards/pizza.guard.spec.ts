import { TestBed } from '@angular/core/testing';

import { PizzaGuard } from './pizza.guard';

describe('PizzaGuard', () => {
  let guard: PizzaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PizzaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
