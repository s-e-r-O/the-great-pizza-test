import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredient } from '@data/types/models';
import { environment } from '@env';
import { Observable } from 'rxjs';

const routes = {
  ingredients: `${environment.apiUrl}/ingredients`,
  ingredient: (ingredientId: number) =>
    `${environment.apiUrl}/ingredients/${ingredientId}`,
};

@Injectable({
  providedIn: 'root',
})
export class IngredientDataService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(routes.ingredients);
  }

  public getById(id: number): Observable<Ingredient> {
    return this.http.get<Ingredient>(routes.ingredient(id));
  }

  public add(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(routes.ingredients, ingredient);
  }

  public update(ingredient: Ingredient): Observable<any> {
    return this.http.put(routes.ingredient(ingredient.id), ingredient);
  }

  public delete(ingredientId: number): Observable<any> {
    return this.http.delete(routes.ingredient(ingredientId));
  }
}
