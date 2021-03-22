import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PizzaApiActions } from '../actions';
import {
  catchError,
  map,
  pluck,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { PizzaDataService } from '@data/services/pizza-data.service';
import * as fromPizzas from '@modules/pizzas/store';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

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

  getPizza$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PizzaApiActions.loadPizza, PizzaApiActions.refreshPizza),
      switchMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.select(fromPizzas.selectPizzaLoaded, {
              pizzaId: action.pizzaId,
            })
          )
        )
      ),
      switchMap(([action, loaded]) => {
        if (loaded && action.type !== PizzaApiActions.refreshPizza.type) {
          return of(PizzaApiActions.loadPizzasCanceled());
        }
        return this.pizzaDataService.getById(action.pizzaId).pipe(
          map((pizza) => PizzaApiActions.loadPizzaSuccess({ pizza })),
          catchError(() => of(PizzaApiActions.loadPizzaFailure()))
        );
      })
    )
  );

  addPizza$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PizzaApiActions.addPizza),
      pluck('pizza'),
      switchMap((pizza) =>
        this.pizzaDataService.add(pizza).pipe(
          map((addedPizza) =>
            PizzaApiActions.addPizzaSuccess({ pizza: addedPizza })
          ),
          catchError(() => of(PizzaApiActions.addPizzaFailure()))
        )
      )
    )
  );

  updatePizza$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PizzaApiActions.updatePizza),
      pluck('pizza'),
      switchMap((pizza) =>
        this.pizzaDataService.update(pizza).pipe(
          map(() => PizzaApiActions.updatePizzaSuccess({ pizza })),
          catchError(() => of(PizzaApiActions.updatePizzaFailure()))
        )
      )
    )
  );

  deletePizza$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PizzaApiActions.deletePizza),
      pluck('pizzaId'),
      switchMap((pizzaId) =>
        this.pizzaDataService.delete(pizzaId).pipe(
          map(() =>
            PizzaApiActions.deletePizzaSuccess({
              pizzaId,
            })
          ),
          tap(() => this.router.navigateByUrl('/pizzas')),
          catchError(() => of(PizzaApiActions.addPizzaFailure()))
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
