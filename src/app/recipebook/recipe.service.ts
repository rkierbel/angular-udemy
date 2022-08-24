import {Injectable} from "@angular/core";
import {Recipe} from "../models/recipe";
import {Ingredient} from "../models/ingredient";
import {ShoppinglistService} from "../shopping/shoppinglist.service";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import * as ShoppingListAction from "../shopping/shopping-list/store/shopping-list-action";
import * as fromShoppingList from "../shopping/shopping-list/store/shopping-list-reducer";
import * as fromApp from '../store/app-reducer';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];/*[
    new Recipe(0,
      'Coca',
      'A déguster en groupe.',
      'https://images.midilibre.fr/api/v1/images/view/5b487a543e45465da0129fdf/large/image.jpg',
      [
        new Ingredient('du fun', 1000),
        new Ingredient('du love', 100000)]
    ),
    new Recipe(1,
      'Banane',
      'Y\'a bon.',
      'https://www.timeforkids.com/wp-content/uploads/2020/02/banana.jpg?w=1024',
      [
        new Ingredient('du soleil', 1000),
        new Ingredient('des bananiers', 100000)]
    )
  ];*/

  constructor(private shoppingListService: ShoppinglistService,
              private store: Store<fromApp.AppState>) {
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(toAdd: Ingredient[]) {
    this.store.dispatch(new ShoppingListAction.AddIngredients(toAdd));
    //this.shoppingListService.addIngredients(toAdd);
  }

  getRecipe(number: number | undefined): Recipe {
    const recipe = this.recipes.find(
      (recipe) => {
        return recipe.id === number;
      }
    );
    return recipe ? recipe : new Recipe(10, '', '', '', []);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number | undefined) {
    if (index !== undefined) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
