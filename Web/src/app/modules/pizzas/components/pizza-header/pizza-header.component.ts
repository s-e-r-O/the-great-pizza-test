import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PizzaVM } from '@data/types/view-models';
import { PizzaDialogComponent } from '@modules/pizzas/components/pizza-dialog/pizza-dialog.component';
import * as fromPizzas from '@modules/pizzas/store';
import { PizzaApiActions } from '@modules/pizzas/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-pizza-header',
  templateUrl: './pizza-header.component.html',
  styleUrls: ['./pizza-header.component.scss'],
})
export class PizzaHeaderComponent implements OnInit {
  @Input() pizza!: PizzaVM;
  constructor(
    private store: Store<fromPizzas.State>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onEdit(): void {
    const dialogRef = this.dialog.open(PizzaDialogComponent, {
      data: { name: this.pizza.name },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!!result) {
        this.store.dispatch(
          PizzaApiActions.updatePizza({ pizza: { ...this.pizza, ...result } })
        );
      }
    });
  }

  onDelete(): void {
    this.store.dispatch(
      PizzaApiActions.deletePizza({ pizzaId: this.pizza.id })
    );
  }
}
