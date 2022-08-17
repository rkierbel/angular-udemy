import {Ingredient} from "../../../models/ingredient";
import * as ShoppingListAction from "./shopping-list-action";
import {CustomAction} from "./shopping-list-action";

const initialState = {
  ingredients: [
    new Ingredient('Coca', 1),
    new Ingredient('Patates', 1)
  ]
};

// @ts-ignore
export function shoppingListReducer(state = initialState,
                                    action: CustomAction) {
  switch (action.type) {
    case ShoppingListAction.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListAction.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListAction.UPDATE_INGREDIENT:
      const toEdit = state.ingredients[action.payload.index];
      const updatedIngredient = {
        ...toEdit, //copy the old data
        ...action.payload.ingredient //overwrite what changed
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
      };
    case ShoppingListAction.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((i, index) => index !== action.payload),
      };
    default:
      return state;
  }
}
