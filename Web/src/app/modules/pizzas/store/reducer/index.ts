import { IngredientVM, PizzaVM } from '@data/types/view-models';
import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPizzas from './pizzas.reducer';
import * as fromIngredients from '@modules/ingredients/store/reducer';

export const featureKey = 'pizzas';

export interface State extends fromIngredients.State {
  [featureKey]: fromPizzas.State;
}

export function reducers(state: fromPizzas.State, action: Action): any {
  return fromPizzas.reducer(state, action);
}

// SELECTORS

export const selectPizzasState = createFeatureSelector<State, fromPizzas.State>(
  featureKey
);

export const selectAllPizzas = createSelector(
  createSelector(selectPizzasState, fromPizzas.selectAllPizzas),
  fromIngredients.selectIngredientsEntities,
  (pizzas, ingredients) =>
    pizzas.map<PizzaVM>((pizza) => ({
      ...pizza,
      ingredients: (pizza.ingredients as number[])
        .map((ingredient) => ingredients[ingredient])
        .filter((ingredient) => !!ingredient)
        .map((ingredient) => ingredient as NonNullable<IngredientVM>),
    }))
);
export const selectLoaded = createSelector(
  selectPizzasState,
  fromPizzas.selectLoaded
);
