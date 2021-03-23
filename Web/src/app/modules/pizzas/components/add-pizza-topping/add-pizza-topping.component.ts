import { Component, Input, OnInit } from '@angular/core';
import { fadeInOut } from '@app/animations';
import { IngredientVM, PizzaVM } from '@data/types/view-models';
import * as fromIngredients from '@modules/ingredients/store';
import { IngredientApiActions } from '@modules/ingredients/store';
import * as fromPizzas from '@modules/pizzas/store';
import { PizzaToppingActions } from '@modules/pizzas/store';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-add-pizza-topping',
  templateUrl: './add-pizza-topping.component.html',
  styleUrls: ['./add-pizza-topping.component.scss'],
  animations: [fadeInOut],
})
export class AddPizzaToppingComponent implements OnInit {
  @Input() pizza!: PizzaVM;

  selectedToppingId: number | undefined;
  filteredIngredientOptions$!: Observable<IngredientVM[]>;

  constructor(private store: Store<fromPizzas.State>) {}

  ngOnInit(): void {
    this.store.dispatch(IngredientApiActions.loadIngredients());
    this.filteredIngredientOptions$ = combineLatest([
      this.store.select(fromIngredients.selectAllIngredients),
      this.store.select(fromPizzas.selectPizza, { pizzaId: this.pizza.id }),
    ]).pipe(
      map(([ingredients, pizza]) => {
        if (!pizza) {
          return ingredients;
        }
        return ingredients.filter(
          (ingredient) =>
            pizza.ingredients.findIndex(
              (pizzaIngredient) => pizzaIngredient.id === ingredient.id
            ) < 0
        );
      })
    );
  }

  onAddTopping(): void {
    this.store.dispatch(
      PizzaToppingActions.addPizzaTopping({
        pizzaId: this.pizza.id,
        ingredientId: this.selectedToppingId as number,
      })
    );
    this.selectedToppingId = undefined;
  }
}
