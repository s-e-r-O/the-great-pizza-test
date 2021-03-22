import { Ingredient } from './ingredient';

export interface Pizza {
  id: number;
  name: string;
  /**
   * A list of ingredients IDs that serve as
   * toppings for the pizza
   */
  ingredients: (number | Ingredient)[];
}
