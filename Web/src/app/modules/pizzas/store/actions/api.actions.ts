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

export const loadPizza = createAction(
  '[Pizzas] Load Pizza',
  props<{ pizzaId: number }>()
);
export const loadPizzaSuccess = createAction(
  '[Pizzas] Load Pizza Success',
  props<{ pizza: Pizza }>()
);
export const loadPizzaFailure = createAction('[Pizzas] Load Pizza Failure');
export const loadPizzaCanceled = createAction('[Pizzas] Load Pizza Canceled');
export const refreshPizza = createAction(
  '[Pizzas] Refresh Pizza',
  props<{ pizzaId: number }>()
);

export const addPizza = createAction(
  '[Pizzas] Add Pizza',
  props<{ pizza: Partial<Pizza> }>()
);
export const addPizzaSuccess = createAction(
  '[Pizzas] Add Pizza Success',
  props<{ pizza: Pizza }>()
);
export const addPizzaFailure = createAction('[Pizzas] Add Pizza Failure');

export const updatePizza = createAction(
  '[Pizzas] Update Pizza',
  props<{ pizza: Pizza }>()
);
export const updatePizzaSuccess = createAction(
  '[Pizzas] Update Pizza Success',
  props<{ pizza: Pizza }>()
);
export const updatePizzaFailure = createAction('[Pizzas] Update Pizza Failure');
