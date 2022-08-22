import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../../models/ingredient";
import {ShoppinglistService} from "../../shoppinglist.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as ShoppingListAction from "../store/shopping-list-action";
import * as fromShoppingList from "../store/shopping-list-reducer";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) shoppingListForm: NgForm | undefined;
  subscription: Subscription | undefined;
  editMode = false;
  editedItemIndex?: number;
  editedItem?: Ingredient | null;

  constructor(private shoppingListService: ShoppinglistService,
              private store: Store<fromShoppingList.AppState>) {
  }

  ngOnInit(): void {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.shoppingListForm?.setValue({
          // @ts-ignore
          name: this.editedItem.name,
          // @ts-ignore
          amount: this.editedItem.amount
        })
      } else this.editMode = false;
    });
/*    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(index);

        }
      )*/
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(new ShoppingListAction.UpdateIngredient(newIngredient));
      //this.shoppingListService.onEditItem(this.editedItemIndex, newIngredient)
    } else {
      this.store.dispatch(new ShoppingListAction.AddIngredient(newIngredient));
      //this.shoppingListService.addIngredient(new Ingredient(value.name, value.amount));
    }
    this.editMode = false;
    form.reset();
  }

  ngOnDestroy() {
    // @ts-ignore
    this.subscription.unsubscribe();
  }

  onClear() {
    this.shoppingListForm?.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListAction.StopEdit());
  }

  onDelete(f: NgForm) {
    // @ts-ignore
    this.store.dispatch(new ShoppingListAction.DeleteIngredient())
    //this.shoppingListService.deleteItem(this.editedItemIndex);
    this.onClear();
  }
}
