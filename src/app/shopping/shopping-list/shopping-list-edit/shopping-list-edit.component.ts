import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../../models/ingredient";
import {ShoppinglistService} from "../../shoppinglist.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as ShoppingListAction from "../store/shopping-list-action";

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
  editedItem: Ingredient | undefined;

  constructor(private shoppingListService: ShoppinglistService,
              private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) {
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingListForm?.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    )
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(new ShoppingListAction.UpdateIngredient({
      // @ts-ignore
        index: this.editedItemIndex,
        ingredient: newIngredient
      }))
      //this.shoppingListService.onEditItem(this.editedItemIndex, newIngredient)
    }
    else {
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
  }

  onDelete(f: NgForm) {
    // @ts-ignore
    this.store.dispatch(new ShoppingListAction.DeleteIngredient(this.editedItemIndex))
    //this.shoppingListService.deleteItem(this.editedItemIndex);
    this.onClear();
  }
}
