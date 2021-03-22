import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PizzaGuard } from './guards/pizza.guard';
import { PizzaComponent, PizzasComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: PizzasComponent,
    data: {
      animation: 'PizzasComponent',
    },
  },
  {
    path: ':id',
    component: PizzaComponent,
    canActivate: [PizzaGuard],
    data: {
      animation: 'fade',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PizzasRoutingModule {}
