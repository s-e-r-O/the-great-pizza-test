import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromPizzas from '@modules/pizzas/store';
import { PizzaApiActions } from '@modules/pizzas/store';
@Injectable({
  providedIn: 'root',
})
export class PizzaGuard implements CanActivate {
  constructor(private store: Store<fromPizzas.State>, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const pizzaId = route.params.id;
    if (!pizzaId || isNaN(pizzaId)) {
      // Incorrect id
      return this.router.parseUrl('/pizzas');
    }
    this.store.dispatch(PizzaApiActions.loadPizza({ pizzaId: +pizzaId }));
    return true;
  }
}
