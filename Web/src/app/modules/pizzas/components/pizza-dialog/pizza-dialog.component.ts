import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormInputConfig } from '@shared/models';

@Component({
  selector: 'app-pizza-dialog',
  templateUrl: './pizza-dialog.component.html',
  styleUrls: ['./pizza-dialog.component.scss'],
})
export class PizzaDialogComponent implements OnInit {
  formInputConfig: FormInputConfig;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string },
    private dialogRef: MatDialogRef<PizzaDialogComponent>
  ) {
    this.formInputConfig = {
      formControl: new FormControl(data.name, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      label: !data.name ? 'Create pizza' : 'Edit pizza',
      icon: 'local_pizza',
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
    this.dialogRef.close({ name: this.formInputConfig.formControl.value });
  }
}
