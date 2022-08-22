import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../../models/ingredient";
import {ShoppinglistService} from "../shoppinglist.service";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromShoppingList from './store/shopping-list-reducer';
import * as ShoppingListAction from './store/shopping-list-action';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients?: Observable<{ingredients: Ingredient[]}>;
  //ingredientSubscription!: Subscription;

  constructor(private shoppingListService: ShoppinglistService,
              private store: Store<fromShoppingList.AppState>) {
  }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList')
/*    this.ingredients = this.shoppingListService.getAllIngredients();
    this.ingredientSubscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingdts: Ingredient[]) => {
        this.ingredients = ingdts;
      }
    );*/
  }

  ngOnDestroy(): void {
/*
    this.ingredientSubscription.unsubscribe();
*/
  }

  onEditItem(i: number) {
    this.store.dispatch(new ShoppingListAction.StartEdit(i));
    // this.shoppingListService.startedEditing.next(i);
  }
}
