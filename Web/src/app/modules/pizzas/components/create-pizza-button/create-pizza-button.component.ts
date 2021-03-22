import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PizzaDialogComponent } from '@modules/pizzas/components/pizza-dialog/pizza-dialog.component';
import * as fromPizzas from '@modules/pizzas/store';
import { PizzaApiActions } from '@modules/pizzas/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-create-pizza-button',
  templateUrl: './create-pizza-button.component.html',
  styleUrls: ['./create-pizza-button.component.scss'],
})
export class CreatePizzaButtonComponent implements OnInit {
  constructor(
    private store: Store<fromPizzas.State>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onAdd(): void {
    const dialogRef = this.dialog.open(PizzaDialogComponent, { data: {} });
    dialogRef.afterClosed().subscribe((result) => {
      if (!!result) {
        this.store.dispatch(PizzaApiActions.addPizza({ pizza: result }));
      }
    });
  }
}
