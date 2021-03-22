import { Component, OnInit } from '@angular/core';
import { Pizza } from '@data/types/models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromPizzas from '@modules/pizzas/store';
import { PizzaApiActions } from '@modules/pizzas/store';
@Component({
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss'],
})
export class PizzasComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;

  constructor(private store: Store<fromPizzas.State>) {
    this.pizzas$ = this.store.select(fromPizzas.selectAllPizzas);
  }

  ngOnInit(): void {
    this.store.dispatch(PizzaApiActions.loadPizzas());
  }
}
