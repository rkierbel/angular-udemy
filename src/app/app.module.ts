import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './core/header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {AlertComponent} from './shared/alert/alert.component';
import {ReturnToRecipesDirective} from "./shared/return-to-recipes.directive";
import {ShoppingListModule} from "./shopping-list/shopping-list.module";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";
import {AuthModule} from "./auth/auth.module";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ReturnToRecipesDirective,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    BrowserModule,
    CoreModule,
  ],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent]
})
export class AppModule {
}
