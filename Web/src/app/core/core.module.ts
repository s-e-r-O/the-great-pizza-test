import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@env';
import * as fromPizzas from '@modules/pizzas/store';
import * as fromIngredients from '@modules/ingredients/store';
import { PizzasEffects } from '@modules/pizzas/store/effects';
import { IngredientsEffects } from '@modules/ingredients/store/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(
      {
        router: routerReducer,
        [fromPizzas.featureKey]: fromPizzas.reducers,
        [fromIngredients.featureKey]: fromIngredients.reducers,
      },
      {}
    ),
    EffectsModule.forRoot([PizzasEffects, IngredientsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot({}),
  ],
})
export class CoreModule {}
