import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredientsRoutingModule } from './ingredients-routing.module';
import { IngredientsComponent } from './pages/ingredients/ingredients.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { IngredientsEffects } from './store/effects';
import * as fromIngredients from './store';

@NgModule({
  declarations: [IngredientsComponent],
  imports: [
    CommonModule,
    IngredientsRoutingModule,
    StoreModule.forFeature(
      fromIngredients.featureKey,
      fromIngredients.reducers
    ),
    EffectsModule.forFeature([IngredientsEffects]),
  ],
})
export class IngredientsModule {}
