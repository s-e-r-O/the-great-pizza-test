import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from '@layout/components';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: 'pizzas',
        loadChildren: () =>
          import('./modules/pizzas/pizzas.module').then((m) => m.PizzasModule),
      },
      {
        path: 'ingredients',
        loadChildren: () =>
          import('./modules/ingredients/ingredients.module').then(
            (m) => m.IngredientsModule
          ),
      },
      { path: '**', redirectTo: '/pizzas', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
