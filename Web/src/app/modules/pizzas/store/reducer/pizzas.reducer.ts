import { createReducer, on } from '@ngrx/store';
import { PizzaApiActions } from '../actions';
import { Ingredient, Pizza } from '@data/types/models';
import {
  createEntityAdapter,
  Dictionary,
  EntityAdapter,
  EntityState,
} from '@ngrx/entity';

export interface State extends EntityState<Pizza> {
  loaded: boolean;
  pizzaLoaded: Dictionary<boolean>;
}

export const adapter: EntityAdapter<Pizza> = createEntityAdapter<Pizza>({
  selectId: (p: Pizza) => p.id,
  sortComparer: (p1: Pizza, p2: Pizza) => (p1.name > p2.name ? 1 : -1),
});

export const initialState: State = adapter.getInitialState({
  loaded: false,
  pizzaLoaded: {},
});

export const reducer = createReducer(
  initialState,
  on(PizzaApiActions.loadPizzasSuccess, (state, { pizzas }) =>
    adapter.setAll(
      pizzas.map((pizza) => ({
        ...pizza,
        ingredients: (pizza.ingredients as Ingredient[]).map(
          (ingredient) => ingredient.id
        ),
      })),
      { ...state, loaded: true }
    )
  ),
  on(PizzaApiActions.loadPizzaSuccess, (state, { pizza }) =>
    adapter.upsertOne(
      {
        ...pizza,
        ingredients: (pizza.ingredients as Ingredient[]).map(
          (ingredient) => ingredient.id
        ),
      },
      { ...state, pizzaLoaded: { ...state.pizzaLoaded, [pizza.id]: true } }
    )
  ),
  on(PizzaApiActions.addPizzaSuccess, (state, { pizza }) =>
    adapter.addOne(
      {
        ...pizza,
        ingredients: (pizza.ingredients as Ingredient[]).map(
          (ingredient) => ingredient.id
        ),
      },
      { ...state, loaded: true }
    )
  )
);

export const {
  selectAll: selectAllPizzas,
  selectEntities: selectPizzaEntities,
} = adapter.getSelectors();
export const selectLoaded = (state: State) => state.loaded;
export const selectPizzaLoaded = (state: State) => state.pizzaLoaded;
