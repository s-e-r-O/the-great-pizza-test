import { IngredientVM } from './ingredient-vm';

export interface PizzaVM {
  id: number;
  name: string;
  ingredients: IngredientVM[];
}
