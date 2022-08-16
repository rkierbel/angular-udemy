import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecipeService} from "../recipebook/recipe.service";
import {ShoppinglistService} from "../shopping-list/shoppinglist.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "../auth/auth.interceptor";
import {LoggingService} from "../logging.service";



@NgModule({
  declarations: [

  ],
  providers: [
    RecipeService,
    ShoppinglistService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
