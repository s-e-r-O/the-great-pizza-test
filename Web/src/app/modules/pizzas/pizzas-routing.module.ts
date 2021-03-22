import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PizzasComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: PizzasComponent,
    data: {
      animation: 'PizzasComponent',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PizzasRoutingModule {}
