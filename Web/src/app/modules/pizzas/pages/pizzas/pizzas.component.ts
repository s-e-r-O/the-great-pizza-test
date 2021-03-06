import { Component, OnInit } from '@angular/core';
import { fadeInOut, slideInOutList as slideInOutList } from '@app/animations';
import { PizzaVM } from '@data/types/view-models';
import * as fromPizzas from '@modules/pizzas/store';
import { PizzaApiActions } from '@modules/pizzas/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss'],
  animations: [
    slideInOutList({
      itemHeight: 72,
      side: 'right',
      staggerDelay: 50,
      animDuration: 500,
    }),
    fadeInOut,
  ],
})
export class PizzasComponent implements OnInit {
  pizzas$: Observable<PizzaVM[]>;

  constructor(private store: Store<fromPizzas.State>) {
    this.pizzas$ = this.store.select(fromPizzas.selectAllPizzas);
  }

  ngOnInit(): void {
    this.store.dispatch(PizzaApiActions.loadPizzas());
  }

  trackByFn(index: number, pizza: PizzaVM): number {
    return pizza.id;
  }
}
