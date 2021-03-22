import { Component, OnInit } from '@angular/core';
import { Ingredient } from '@data/types/models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromIngredients from '@modules/ingredients/store';
import { IngredientApiActions } from '@modules/ingredients/store';
import { IngredientVM } from '@data/types/view-models';
@Component({
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
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
}
