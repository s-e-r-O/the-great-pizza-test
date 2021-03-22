import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PizzaVM } from '@data/types/view-models';
import { PizzaDialogComponent } from '@modules/pizzas/components';
import * as fromPizzas from '@modules/pizzas/store';
import { PizzaApiActions } from '@modules/pizzas/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss'],
})
export class PizzasComponent implements OnInit {
  pizzas$: Observable<PizzaVM[]>;

  constructor(
    private store: Store<fromPizzas.State>,
    private dialog: MatDialog
  ) {
    this.pizzas$ = this.store.select(fromPizzas.selectAllPizzas);
  }

  ngOnInit(): void {
    this.store.dispatch(PizzaApiActions.loadPizzas());
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(PizzaDialogComponent, { data: {} });
    dialogRef.afterClosed().subscribe((result) => {
      if (!!result) {
        this.store.dispatch(PizzaApiActions.addPizza({ pizza: result }));
      }
    });
  }

  trackByFn(index: number, pizza: PizzaVM): number {
    return pizza.id;
  }
}
