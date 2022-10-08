import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryGuard } from './guards/category.guard';
import { CategoryComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
    canActivate: [CategoryGuard],
    data: {
      animation: 'pageComponent',
    },
  },
  {
    path: ':id',
    component: CategoryComponent,
    canActivate: [CategoryGuard],
    data: {
      animation: 'pageComponent',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
