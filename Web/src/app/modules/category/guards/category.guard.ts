import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CategoryDataService } from '@data/services';
import { map, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CategoryGuard implements CanActivate {
  constructor(
    private categoryDataService: CategoryDataService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const categoryId = route.params.id;
    if (!categoryId) {
      return this.goToFirstCategory();
    }
    return this.categoryDataService.getById(categoryId).pipe(
      switchMap((category) => {
        if (!category) {
          return this.goToFirstCategory();
        }
        return of(true);
      })
    );
  }

  private goToFirstCategory(): Observable<boolean | UrlTree> {
    return this.categoryDataService.getAll().pipe(
      map((categories) => {
        if (categories.length === 0) {
          return false;
        }
        return this.router.parseUrl(`/${categories[0].id}`);
      })
    );
  }
}
