import { Ingredient } from '@data/types/models';
import { createAction, props } from '@ngrx/store';

export const loadIngredients = createAction('[Ingredients] Load Ingredients');
export const loadIngredientsSuccess = createAction(
  '[Ingredients] Load Ingredients Success',
  props<{ ingredients: Ingredient[] }>()
);
export const loadIngredientsFailure = createAction(
  '[Ingredients] Load Ingredients Failure'
);
export const loadIngredientsCanceled = createAction(
  '[Ingredients] Load Ingredients Canceled'
);
export const refreshIngredients = createAction(
  '[Ingredients] Refresh Ingredients'
);
