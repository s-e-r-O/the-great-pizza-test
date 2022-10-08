import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '@data/types/models';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const routes = {
  categories: `assets/menu.json`,
};

@Injectable({
  providedIn: 'root',
})
export class CategoryDataService {
  private cachedCategories: Category[] | undefined;
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Category[]> {
    if (!this.cachedCategories) {
      return this.http
        .get<Category[]>(routes.categories)
        .pipe(tap((categories) => (this.cachedCategories = categories)));
    }
    return of(this.cachedCategories);
  }

  public getById(id: string): Observable<Category | undefined> {
    return this.getAll().pipe(
      map((categories) => categories.find((c) => c.id === id))
    );
  }
}
