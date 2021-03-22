import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PizzaVM } from '@data/types/view-models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as fromPizzas from '@modules/pizzas/store';
@Component({
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss'],
})
export class PizzaComponent implements OnInit {
  pizza$: Observable<PizzaVM | undefined>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromPizzas.State>
  ) {
    this.pizza$ = this.route.params.pipe(
      switchMap((params) => {
        return this.store.select(fromPizzas.selectPizza, {
          pizzaId: +params.id,
        });
      })
    );
  }

  ngOnInit(): void {}
}
