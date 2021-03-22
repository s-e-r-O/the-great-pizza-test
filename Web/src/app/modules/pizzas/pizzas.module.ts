import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { IngredientsSharedModule } from '@shared/modules';
import { SharedModule } from '@shared/shared.module';
import {
  PizzaDialogComponent,
  PizzaCardComponent,
  CreatePizzaButtonComponent,
  PizzaHeaderComponent,
} from './components';
import { PizzasComponent, PizzaComponent } from './pages';
import { PizzasRoutingModule } from './pizzas-routing.module';
import * as fromPizzas from './store';
import { PizzasEffects } from './store/effects';
import { AddPizzaToppingComponent } from './components/add-pizza-topping/add-pizza-topping.component';
import { PizzaToppingsComponent } from './components/pizza-toppings/pizza-toppings.component';
@NgModule({
  declarations: [
    PizzasComponent,
    PizzaDialogComponent,
    PizzaCardComponent,
    PizzaComponent,
    CreatePizzaButtonComponent,
    PizzaHeaderComponent,
    AddPizzaToppingComponent,
    PizzaToppingsComponent,
  ],
  imports: [
    CommonModule,
    PizzasRoutingModule,
    StoreModule.forFeature(fromPizzas.featureKey, fromPizzas.reducers),
    EffectsModule.forFeature([PizzasEffects]),
    SharedModule,
    IngredientsSharedModule,
  ],
})
export class PizzasModule {}
