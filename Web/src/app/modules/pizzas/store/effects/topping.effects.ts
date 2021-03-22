import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PizzaDataService } from '@data/services/pizza-data.service';
import * as fromPizzas from '@modules/pizzas/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PizzaToppingActions } from '../actions';

@Injectable()
export class PizzaToppingsEffects {
  addPizzaTopping$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PizzaToppingActions.addPizzaTopping),
      switchMap((action) =>
        this.pizzaDataService
          .addToppingToPizza(action.pizzaId, action.ingredientId)
          .pipe(
            map(() =>
              PizzaToppingActions.addPizzaToppingSuccess({
                pizzaId: action.pizzaId,
                ingredientId: action.ingredientId,
              })
            ),
            catchError(() =>
              of(
                PizzaToppingActions.addPizzaToppingFailure({
                  pizzaId: action.pizzaId,
                  ingredientId: action.ingredientId,
                })
              )
            )
          )
      )
    )
  );

  deletePizzaTopping$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PizzaToppingActions.deletePizzaTopping),
      switchMap((action) =>
        this.pizzaDataService
          .deleteToppingsFromPizza(action.pizzaId, action.ingredientId)
          .pipe(
            map(() =>
              PizzaToppingActions.deletePizzaToppingSuccess({
                pizzaId: action.pizzaId,
                ingredientId: action.ingredientId,
              })
            ),
            catchError(() =>
              of(
                PizzaToppingActions.deletePizzaToppingFailure({
                  pizzaId: action.pizzaId,
                  ingredientId: action.ingredientId,
                })
              )
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private pizzaDataService: PizzaDataService,
    private store: Store<fromPizzas.State>,
    private router: Router
  ) {}
}
