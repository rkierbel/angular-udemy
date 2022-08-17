import {Action} from "@ngrx/store";
import {Ingredient} from "../../../models/ingredient";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export abstract class CustomAction implements Action {
  readonly type: any;
  readonly payload?: any;
}

export class AddIngredient extends CustomAction {
  override readonly  type = ADD_INGREDIENT;

  constructor(public override payload: Ingredient) {
    super();
    this.payload = payload;
  }
}

export class AddIngredients extends CustomAction {
  override readonly type = ADD_INGREDIENTS;

  constructor(public override payload: Ingredient[]) {
    super();
    this.payload = payload;
  }
}

export class UpdateIngredient extends CustomAction {
  override readonly type = UPDATE_INGREDIENT;

  constructor(public override payload: {index: number, ingredient: Ingredient}) {
    super();
    this.payload = payload;
  }
}

export class DeleteIngredient extends CustomAction {
  override readonly type = DELETE_INGREDIENT;

  constructor(public override payload: number) {
    super();
    this.payload = payload;
  }
}

