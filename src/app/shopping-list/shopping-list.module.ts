import {NgModule} from '@angular/core';
import {ShoppingListComponent} from "../shoppinglist/shopping-list/shopping-list.component";
import {ShoppingListEditComponent} from "../shoppinglist/shopping-list/shopping-list-edit/shopping-list-edit.component";
import {ShoppingListRoutingModule} from "../shopping-list-routing/shopping-list-routing.module";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent
  ],
  imports: [
    ShoppingListRoutingModule,
    SharedModule
  ]
})
export class ShoppingListModule {
}
