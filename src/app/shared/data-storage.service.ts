import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipeService} from "../recipebook/recipe.service";
import {Recipe} from "../models/recipe";
import {exhaustMap, map, take, tap} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeServices: RecipeService,
              private auth: AuthService) {
  }

  storeRecipes() {
    const recipes = this.recipeServices.getRecipes();
    this.http.put('https://recipes-2296e-default-rtdb.europe-west1.firebasedatabase.app//recipes.json', recipes)
      .subscribe(
        response => console.log(response)
      );
  }

  fetchRecipes() {
    let result: Recipe[] = [];
    return this.auth.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http
          .get<Recipe[]>('https://recipes-2296e-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
            {
              // @ts-ignore
              params: new HttpParams().set('auth', user.token)
            })
      }),
      map(data => {
        return data.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        }) // JS array method -> takes an anonymous function applied to all elems in the array, returns the modified object
      }),
      tap(data => this.recipeServices.setRecipes(data)));
  }
}
