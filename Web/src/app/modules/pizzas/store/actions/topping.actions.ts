import { createAction, props } from '@ngrx/store';

export const addPizzaTopping = createAction(
  '[Pizzas] Add Pizza Topping',
  props<{ pizzaId: number; ingredientId: number }>()
);
export const addPizzaToppingSuccess = createAction(
  '[Pizzas] Add Pizza Topping Success',
  props<{ pizzaId: number; ingredientId: number }>()
);
export const addPizzaToppingFailure = createAction(
  '[Pizzas] Add Pizza Topping Faliure',
  props<{ pizzaId: number; ingredientId: number }>()
);
export const deletePizzaTopping = createAction(
  '[Pizzas] Delete Pizza Topping',
  props<{ pizzaId: number; ingredientId: number }>()
);
export const deletePizzaToppingSuccess = createAction(
  '[Pizzas] Delete Pizza Topping Success',
  props<{ pizzaId: number; ingredientId: number }>()
);
export const deletePizzaToppingFailure = createAction(
  '[Pizzas] Delete Pizza Topping Faliure',
  props<{ pizzaId: number; ingredientId: number }>()
);
