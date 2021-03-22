import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredient, Pizza } from '@data/types/models';
import { environment } from '@env';
import { Observable } from 'rxjs';

const routes = {
  pizzas: `${environment.apiUrl}/pizzas`,
  pizza: (pizzaId: number) => `${environment.apiUrl}/pizzas/${pizzaId}`,
  pizzaToppings: (pizzaId: number) =>
    `${environment.apiUrl}/pizzas/${pizzaId}/toppings`,
  pizzaTopping: (pizzaId: number, ingredientId: number) =>
    `${environment.apiUrl}/pizzas/${pizzaId}/toppings/${ingredientId}`,
};

@Injectable({
  providedIn: 'root',
})
export class PizzaDataService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(routes.pizzas);
  }

  public getById(id: number): Observable<Pizza> {
    return this.http.get<Pizza>(routes.pizza(id));
  }

  public getToppingsFromPizza(pizzaId: number): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(routes.pizzaToppings(pizzaId));
  }

  public add(pizza: Pizza): Observable<Pizza> {
    return this.http.post<Pizza>(routes.pizzas, pizza);
  }

  public addToppingToPizza(
    pizzaId: number,
    ingredientId: number
  ): Observable<any> {
    return this.http.put(routes.pizzaTopping(pizzaId, ingredientId), {});
  }

  public update(pizza: Pizza): Observable<any> {
    return this.http.put(routes.pizza(pizza.id), pizza);
  }

  public delete(pizzaId: number): Observable<any> {
    return this.http.delete(routes.pizza(pizzaId));
  }

  public deleteToppingsFromPizza(
    pizzaId: number,
    ingredientId: number
  ): Observable<any> {
    return this.http.delete(routes.pizzaTopping(pizzaId, ingredientId));
  }
}
