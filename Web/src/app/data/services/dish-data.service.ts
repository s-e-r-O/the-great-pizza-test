import { Injectable } from '@angular/core';
import { Dish } from '@data/types/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryDataService } from './category-data.service';

const routes = {
  categories: `assets/menu.json`,
};

@Injectable({
  providedIn: 'root',
})
export class DishDataService {
  constructor(private categoryDataService: CategoryDataService) {}

  public getAllByCategoryId(categoryId: string): Observable<Dish[]> {
    return this.categoryDataService
      .getById(categoryId)
      .pipe(map((category) => category?.items || []));
  }
}
