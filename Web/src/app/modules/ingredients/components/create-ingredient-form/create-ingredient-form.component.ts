import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CustomErrorStateMatcher } from '@shared/utils/forms';
import * as fromIngredients from '@modules/ingredients/store';
import { Store } from '@ngrx/store';
import { IngredientApiActions } from '@modules/ingredients/store';

@Component({
  selector: 'app-create-ingredient-form',
  templateUrl: './create-ingredient-form.component.html',
  styleUrls: ['./create-ingredient-form.component.scss'],
})
export class CreateIngredientFormComponent implements OnInit {
  nameFormControl: FormControl;
  matcher = new CustomErrorStateMatcher();
  constructor(private store: Store<fromIngredients.State>) {
    this.nameFormControl = new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]);
  }

  ngOnInit(): void {}

  onClick(): void {
    this.store.dispatch(
      IngredientApiActions.addIngredient({
        ingredient: { name: this.nameFormControl.value },
      })
    );
    this.nameFormControl.setValue('');
    this.nameFormControl.markAsUntouched();
    this.nameFormControl.markAsPristine();
  }
}
