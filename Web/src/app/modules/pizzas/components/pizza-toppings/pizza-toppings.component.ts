import { Component, Input, OnInit } from '@angular/core';
import { IngredientVM, PizzaVM } from '@data/types/view-models';
import * as fromPizzas from '@modules/pizzas/store';
import { PizzaToppingActions } from '@modules/pizzas/store';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-pizza-toppings',
  templateUrl: './pizza-toppings.component.html',
  styleUrls: ['./pizza-toppings.component.scss'],
})
export class PizzaToppingsComponent implements OnInit {
  @Input() pizza!: PizzaVM;
  constructor(private store: Store<fromPizzas.State>) {}

  ngOnInit(): void {}

  onRemoved(ingredient: IngredientVM): void {
    this.store.dispatch(
      PizzaToppingActions.deletePizzaTopping({
        pizzaId: this.pizza.id,
        ingredientId: ingredient.id,
      })
    );
  }
}
