import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../../models/ingredient";
import {ShoppinglistService} from "../shoppinglist.service";
import {Subscription} from "rxjs";
import {LoggingService} from "../../logging.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  ingredientSubscription!: Subscription;

  constructor(private shoppingListService: ShoppinglistService,
              private logger: LoggingService) {
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getAllIngredients();
    this.ingredientSubscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingdts: Ingredient[]) => {
        this.ingredients = ingdts;
      }
    );
    this.logger.printLog("Hello from ShoppingListComponent ngOnInit");
  }

  ngOnDestroy(): void {
    this.ingredientSubscription.unsubscribe();
  }

  onEditItem(i: number) {
    this.shoppingListService.startedEditing.next(i);
  }
}
