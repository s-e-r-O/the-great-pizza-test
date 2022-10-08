import { NgModule } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  BaseRouteReuseStrategy,
  DetachedRouteHandle,
  PreloadAllModules,
  RouteReuseStrategy,
  RouterModule,
  Routes,
} from '@angular/router';
import { ContentLayoutComponent } from '@layout/components';
import { CategoryComponent } from '@modules/category/pages';

class CustomStrategy extends BaseRouteReuseStrategy {
  handlers: { [key: string]: DetachedRouteHandle } = {};

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    return curr.component !== CategoryComponent;
  }
}

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/category/category.module').then(
            (m) => m.CategoryModule
          ),
      },
      { path: '**', redirectTo: '/', pathMatch: 'full' },
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
  providers: [{ provide: RouteReuseStrategy, useClass: CustomStrategy }],
})
export class AppRoutingModule {}
