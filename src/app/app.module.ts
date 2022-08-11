import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './core/header/header.component';
import {RecipeListComponent} from './recipebook/recipe-list/recipe-list.component';
import {RecipeDetailComponent} from './recipebook/recipe-detail/recipe-detail.component';
import {RecipeItemComponent} from './recipebook/recipe-list/recipe-item/recipe-item.component';
import {ShoppingListComponent} from './shoppinglist/shopping-list/shopping-list.component';
import {ShoppingListEditComponent} from './shoppinglist/shopping-list/shopping-list-edit/shopping-list-edit.component';
import {RecipesComponent} from './recipebook/recipes.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {AppRoutingModule} from "./app-routing.module";
import {WelcomeRecipesComponent} from './recipebook/welcome-recipes/welcome-recipes.component';
import {ReturnToRecipesDirective} from "./shared/return-to-recipes.directive";
import {RecipeEditComponent} from './recipebook/recipe-edit/recipe-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RecipeService} from "./recipebook/recipe.service";
import {ShoppinglistService} from "./shoppinglist/shoppinglist.service";
import {HttpClientModule} from "@angular/common/http";
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipesComponent,
    DropdownDirective,
    WelcomeRecipesComponent,
    ReturnToRecipesDirective,
    RecipeEditComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [RecipeService, ShoppinglistService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
