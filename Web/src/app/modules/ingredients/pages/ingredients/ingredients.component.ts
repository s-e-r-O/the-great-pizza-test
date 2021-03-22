import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromIngredients from '@modules/ingredients/store';
import { IngredientApiActions } from '@modules/ingredients/store';
import { IngredientVM } from '@data/types/view-models';
import { fadeInOut } from '@app/animations';
@Component({
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
  animations: [fadeInOut],
})
export class IngredientsComponent implements OnInit {
  ingredients$: Observable<IngredientVM[]>;

  constructor(private store: Store<fromIngredients.State>) {
    this.ingredients$ = this.store.select(fromIngredients.selectAllIngredients);
  }

  ngOnInit(): void {
    this.store.dispatch(IngredientApiActions.loadIngredients());
  }

  trackByFn(index: number, ingredient: IngredientVM): number {
    return ingredient.id;
  }

  onIngredientRemoved(ingredient: IngredientVM): void {
    this.store.dispatch(
      IngredientApiActions.deleteIngredient({ ingredientId: ingredient.id })
    );
  }
}
