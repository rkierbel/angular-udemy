import {Ingredient} from "../../../models/ingredient";
import * as ShoppingListAction from "./shopping-list-action";
import {CustomAction} from "./shopping-list-action";

export interface State {
  ingredients: Ingredient[],
  editedIngredient: Ingredient | null,
  editedIngredientIndex: number
}

const initialState: State = {
  ingredients: [
    new Ingredient('Coca', 1),
    new Ingredient('Patates', 1)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

// @ts-ignore
export function shoppingListReducer(state: State = initialState,
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
        ...action.payload //overwrite what changed
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListAction.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((i, index) => index !== state.editedIngredientIndex),
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListAction.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: {...state.ingredients[action.payload]}
      }
    case ShoppingListAction.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      }
    default:
      return state;
  }
}
