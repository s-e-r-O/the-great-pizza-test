import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredientsRoutingModule } from './ingredients-routing.module';
import { IngredientsComponent } from './pages/ingredients/ingredients.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { IngredientsEffects } from './store/effects';
import * as fromIngredients from './store';
import { SharedModule } from '@shared/shared.module';
import { IngredientsSharedModule } from '@shared/modules';
import { CreateIngredientFormComponent } from './components/create-ingredient-form/create-ingredient-form.component';

@NgModule({
  declarations: [IngredientsComponent, CreateIngredientFormComponent],
  imports: [
    CommonModule,
    IngredientsRoutingModule,
    StoreModule.forFeature(
      fromIngredients.featureKey,
      fromIngredients.reducers
    ),
    EffectsModule.forFeature([IngredientsEffects]),
    SharedModule,
    IngredientsSharedModule,
  ],
})
export class IngredientsModule {}
