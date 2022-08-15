import {NgModule} from '@angular/core';
import {RecipeListComponent} from "../recipebook/recipe-list/recipe-list.component";
import {RecipeDetailComponent} from "../recipebook/recipe-detail/recipe-detail.component";
import {RecipeItemComponent} from "../recipebook/recipe-list/recipe-item/recipe-item.component";
import {RecipesComponent} from "../recipebook/recipes.component";
import {WelcomeRecipesComponent} from "../recipebook/welcome-recipes/welcome-recipes.component";
import {RecipeEditComponent} from "../recipebook/recipe-edit/recipe-edit.component";
import {RecipesRoutingModule} from "./recipes-routing.module";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipesComponent,
    WelcomeRecipesComponent,
    RecipeEditComponent
  ],
  imports: [
    RecipesRoutingModule,
    SharedModule
  ],
})
export class RecipesModule { }
