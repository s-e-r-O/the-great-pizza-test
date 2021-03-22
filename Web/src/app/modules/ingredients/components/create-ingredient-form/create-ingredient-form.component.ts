import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CustomErrorStateMatcher } from '@shared/utils/forms';
import * as fromIngredients from '@modules/ingredients/store';
import { Store } from '@ngrx/store';
import { IngredientApiActions } from '@modules/ingredients/store';
import { FormInputConfig } from '@shared/models';

@Component({
  selector: 'app-create-ingredient-form',
  templateUrl: './create-ingredient-form.component.html',
  styleUrls: ['./create-ingredient-form.component.scss'],
})
export class CreateIngredientFormComponent implements OnInit {
  formInputConfig: FormInputConfig;
  matcher = new CustomErrorStateMatcher();
  constructor(private store: Store<fromIngredients.State>) {
    this.formInputConfig = {
      formControl: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      label: 'Create ingredient',
      icon: 'takeout_dining',
      placeholder: 'Name',
      errorMessagesHTML: [
        {
          errorId: 'required',
          message: () => 'Name is <strong>required</strong>',
        },
        {
          errorId: 'maxlength',
          message: (err: any) =>
            `The name can't be longer than <strong>${err.requiredLength} characters</strong> (${err.actualLength}/${err.requiredLength})`,
        },
      ],
      submitMessage: 'Ok',
    };
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.store.dispatch(
      IngredientApiActions.addIngredient({
        ingredient: { name: this.formInputConfig.formControl.value },
      })
    );
    this.formInputConfig.formControl.setValue('');
    this.formInputConfig.formControl.markAsUntouched();
    this.formInputConfig.formControl.markAsPristine();
  }
}
