import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "../recipebook/recipes.component";
import {AuthGuard} from "../auth/auth-guard";
import {WelcomeRecipesComponent} from "../recipebook/welcome-recipes/welcome-recipes.component";
import {RecipeEditComponent} from "../recipebook/recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "../recipebook/recipe-detail/recipe-detail.component";
import {RecipeResolverService} from "../recipe-resolver.service";

const routes: Routes = [
  {path: '', component: RecipesComponent, canActivate: [AuthGuard], children:[
      {path: '', component: WelcomeRecipesComponent, pathMatch:'full'},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService]}
    ]}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
