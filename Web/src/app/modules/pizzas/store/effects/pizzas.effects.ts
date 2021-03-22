import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PizzaApiActions } from '../actions';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { PizzaDataService } from '@data/services/pizza-data.service';
import * as fromPizzas from '@modules/pizzas/store';
import { Store } from '@ngrx/store';

@Injectable()
export class PizzasEffects {
  getPizzas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PizzaApiActions.loadPizzas, PizzaApiActions.refreshPizzas),
      withLatestFrom(this.store.select(fromPizzas.selectLoaded)),
      switchMap(([action, loaded]) => {
        if (loaded && action.type !== PizzaApiActions.refreshPizzas.type) {
          return of(PizzaApiActions.loadPizzasCanceled());
        }
        return this.pizzaDataService.getAll().pipe(
          map((pizzas) => PizzaApiActions.loadPizzasSuccess({ pizzas })),
          catchError(() => of(PizzaApiActions.loadPizzasFailure()))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private pizzaDataService: PizzaDataService,
    private store: Store<fromPizzas.State>
  ) {}
}
