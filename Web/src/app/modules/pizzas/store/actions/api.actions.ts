import { Pizza } from '@data/types/models';
import { createAction, props } from '@ngrx/store';

export const loadPizzas = createAction('[Pizzas] Load Pizzas');
export const loadPizzasSuccess = createAction(
  '[Pizzas] Load Pizzas Success',
  props<{ pizzas: Pizza[] }>()
);
export const loadPizzasFailure = createAction('[Pizzas] Load Pizzas Failure');
export const loadPizzasCanceled = createAction('[Pizzas] Load Pizzas Canceled');
export const refreshPizzas = createAction('[Pizzas] Refresh Pizzas');

export const addPizza = createAction(
  '[Pizzas] Add Pizza',
  props<{ pizza: Partial<Pizza> }>()
);
export const addPizzaSuccess = createAction(
  '[Pizzas] Add Pizza Success',
  props<{ pizza: Pizza }>()
);
export const addPizzaFailure = createAction('[Pizzas] Add Pizza Failure');
