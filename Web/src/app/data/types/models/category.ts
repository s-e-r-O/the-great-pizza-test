import { Dish } from './dish';

export interface Category {
  id: string;
  title: string;
  imageUrl: string;
  items: Dish[];
}
