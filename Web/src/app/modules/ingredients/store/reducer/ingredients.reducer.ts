import { createReducer, on } from '@ngrx/store';
import { IngredientApiActions } from '../actions';
import { Ingredient } from '@data/types/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { PizzaApiActions } from '@modules/pizzas/store/actions';

export interface State extends EntityState<Ingredient> {
  loaded: boolean;
  ingredientLoaded: { [id: number]: boolean };
}

export const adapter: EntityAdapter<Ingredient> = createEntityAdapter<Ingredient>(
  {
    selectId: (p: Ingredient) => p.id,
    sortComparer: (p1: Ingredient, p2: Ingredient) =>
      p1.name > p2.name ? 1 : -1,
  }
);

export const initialState: State = adapter.getInitialState({
  loaded: false,
  ingredientLoaded: {},
});

export const reducer = createReducer(
  initialState,
  on(IngredientApiActions.loadIngredientsSuccess, (state, { ingredients }) =>
    adapter.setAll(ingredients, { ...state, loaded: true })
  ),
  on(PizzaApiActions.loadPizzasSuccess, (state, { pizzas }) =>
    adapter.setAll(
      pizzas.reduce<Ingredient[]>((ingredients, pizza) => {
        return ingredients.concat(pizza.ingredients as Ingredient[]);
      }, []),
      { ...state, loaded: true }
    )
  )
);

export const {
  selectAll: selectAllIngredients,
  selectEntities: selectIngredientEntities,
} = adapter.getSelectors();
export const selectLoaded = (state: State) => state.loaded;
