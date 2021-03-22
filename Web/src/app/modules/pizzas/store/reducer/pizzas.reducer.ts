import { createReducer, on } from '@ngrx/store';
import { PizzaApiActions } from '../actions';
import { Ingredient, Pizza } from '@data/types/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface State extends EntityState<Pizza> {
  loaded: boolean;
  pizzaLoaded: { [id: number]: boolean };
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
  )
);

export const { selectAll: selectAllPizzas } = adapter.getSelectors();
export const selectLoaded = (state: State) => state.loaded;
