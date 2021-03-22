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
} from './components';
import { PizzasComponent } from './pages';
import { PizzasRoutingModule } from './pizzas-routing.module';
import * as fromPizzas from './store';
import { PizzasEffects } from './store/effects';
@NgModule({
  declarations: [
    PizzasComponent,
    PizzaDialogComponent,
    PizzaCardComponent,
    CreatePizzaButtonComponent,
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
