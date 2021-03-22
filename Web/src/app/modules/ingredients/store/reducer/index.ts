import { IngredientVM } from '@data/types/view-models';
import { Dictionary } from '@ngrx/entity';
import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromIngredients from './ingredients.reducer';

export const featureKey = 'ingredients';

export interface State {
  [featureKey]: fromIngredients.State;
}

export function reducers(state: fromIngredients.State, action: Action): any {
  return fromIngredients.reducer(state, action);
}

// SELECTORS

export const selectIngredientsState = createFeatureSelector<
  State,
  fromIngredients.State
>(featureKey);

export const selectAllIngredients = createSelector<
  State,
  fromIngredients.State,
  IngredientVM[]
>(selectIngredientsState, fromIngredients.selectAllIngredients);

export const selectIngredientsEntities = createSelector<
  State,
  fromIngredients.State,
  Dictionary<IngredientVM>
>(selectIngredientsState, fromIngredients.selectIngredientEntities);

export const selectLoaded = createSelector(
  selectIngredientsState,
  fromIngredients.selectLoaded
);
