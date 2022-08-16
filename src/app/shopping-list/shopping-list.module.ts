import {NgModule} from '@angular/core';
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {ShoppingListEditComponent} from "./shopping-list/shopping-list-edit/shopping-list-edit.component";
import {ShoppingListRoutingModule} from "./shopping-list-routing.module";
import {SharedModule} from "../shared/shared.module";
import {LoggingService} from "../logging.service";


@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent
  ],
  imports: [
    ShoppingListRoutingModule,
    SharedModule
  ],
  providers: []
})
export class ShoppingListModule {
}
