import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientChipComponent } from './components';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [IngredientChipComponent],
  imports: [CommonModule, SharedModule],
  exports: [IngredientChipComponent],
})
export class IngredientsSharedModule {}
