import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryRoutingModule } from './category-routing.module';
import { SharedModule } from '@shared/shared.module';
import { DishCardComponent } from './components/dish-card/dish-card.component';

@NgModule({
  declarations: [CategoryComponent, DishCardComponent],
  imports: [CommonModule, CategoryRoutingModule, SharedModule],
})
export class CategoryModule {}
