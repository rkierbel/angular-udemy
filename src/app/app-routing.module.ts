import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from "@angular/router";
import {RecipesComponent} from "./recipebook/recipes.component";
import {ShoppingListComponent} from "./shoppinglist/shopping-list/shopping-list.component";
import {RecipeDetailComponent} from "./recipebook/recipe-detail/recipe-detail.component";
import {WelcomeRecipesComponent} from "./recipebook/welcome-recipes/welcome-recipes.component";
import {RecipeEditComponent} from "./recipebook/recipe-edit/recipe-edit.component";
import {RecipeResolverService} from "./recipe-resolver.service";
import {AuthComponent} from "./auth/auth.component";

const routes: Route[] = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, children:[
      {path: '', component: WelcomeRecipesComponent, pathMatch:'full'},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService]}
    ]},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'auth', component: AuthComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
