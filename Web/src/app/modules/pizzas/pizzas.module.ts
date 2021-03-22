import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzasRoutingModule } from './pizzas-routing.module';
import { PizzasComponent } from './pages/pizzas/pizzas.component';
import { StoreModule } from '@ngrx/store';
import * as fromPizzas from './store';
import { EffectsModule } from '@ngrx/effects';
import { PizzaEffects } from './store/effects';
@NgModule({
  declarations: [PizzasComponent],
  imports: [
    CommonModule,
    PizzasRoutingModule,
    StoreModule.forFeature(fromPizzas.featureKey, fromPizzas.reducers),
    EffectsModule.forFeature([PizzaEffects]),
  ],
})
export class PizzasModule {}
