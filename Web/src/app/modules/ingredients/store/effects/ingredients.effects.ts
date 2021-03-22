import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IngredientApiActions } from '../actions';
import {
  catchError,
  map,
  pluck,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { IngredientDataService } from '@data/services/ingredient-data.service';
import * as fromIngredients from '@modules/ingredients/store';
import { Store } from '@ngrx/store';

@Injectable()
export class IngredientsEffects {
  getIngredients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        IngredientApiActions.loadIngredients,
        IngredientApiActions.refreshIngredients
      ),
      withLatestFrom(this.store.select(fromIngredients.selectLoaded)),
      switchMap(([action, loaded]) => {
        if (
          loaded &&
          action.type !== IngredientApiActions.refreshIngredients.type
        ) {
          return of(IngredientApiActions.loadIngredientsCanceled());
        }
        return this.ingredientDataService.getAll().pipe(
          map((ingredients) =>
            IngredientApiActions.loadIngredientsSuccess({ ingredients })
          ),
          catchError(() => of(IngredientApiActions.loadIngredientsFailure()))
        );
      })
    )
  );

  addIngredient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IngredientApiActions.addIngredient),
      pluck('ingredient'),
      switchMap((ingredient) =>
        this.ingredientDataService.add(ingredient).pipe(
          map((addedIngredient) =>
            IngredientApiActions.addIngredientSuccess({
              ingredient: addedIngredient,
            })
          ),
          catchError(() => of(IngredientApiActions.addIngredientFailure()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private ingredientDataService: IngredientDataService,
    private store: Store<fromIngredients.State>
  ) {}
}
