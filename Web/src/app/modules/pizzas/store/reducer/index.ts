import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPizzas from './pizza.reducer';

export const featureKey = 'pizzas';

export interface State {
  [featureKey]: fromPizzas.State;
}

export function reducers(
  state: fromPizzas.State,
  action: Action
): fromPizzas.State {
  return fromPizzas.reducer(state, action);
}

// SELECTORS

export const selectPizzasState = createFeatureSelector<State, fromPizzas.State>(
  featureKey
);

export const selectAllPizzas = createSelector(
  selectPizzasState,
  fromPizzas.selectAllPizzas
);
export const selectLoaded = createSelector(
  selectPizzasState,
  fromPizzas.selectLoaded
);
