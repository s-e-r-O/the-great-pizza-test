import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomErrorStateMatcher } from '@shared/utils/forms';

@Component({
  selector: 'app-pizza-dialog',
  templateUrl: './pizza-dialog.component.html',
  styleUrls: ['./pizza-dialog.component.scss'],
})
export class PizzaDialogComponent implements OnInit {
  nameFormControl: FormControl;
  matcher = new CustomErrorStateMatcher();
  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string }) {
    this.nameFormControl = new FormControl(data.name, [
      Validators.required,
      Validators.maxLength(50),
    ]);
  }

  ngOnInit(): void {}
}
