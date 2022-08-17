import {NgModule} from '@angular/core';
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeItemComponent} from "./recipe-list/recipe-item/recipe-item.component";
import {RecipesComponent} from "./recipes.component";
import {WelcomeRecipesComponent} from "./welcome-recipes/welcome-recipes.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
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
