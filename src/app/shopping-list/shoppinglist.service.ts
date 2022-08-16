import {Injectable} from "@angular/core";
import {Ingredient} from "../models/ingredient";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {
  ingredients: Ingredient[] = [
    new Ingredient('Coca', 1),
    new Ingredient('Patates', 1)
  ];
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  getAllIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(toAdd: Ingredient[]) {
    this.ingredients.push(...toAdd);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredient(index: number): Ingredient{
    return this.ingredients[index];
  }

  onEditItem(index: number | undefined, newIngredient: Ingredient) {
    if (index !== undefined) this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  deleteItem(index: number | undefined) {
    if (index !== undefined) {
      const toRemove = this.ingredients[index];
      this.ingredients.splice(index, 1);
      this.ingredientsChanged.next(this.ingredients.slice());
    }
  }
}
