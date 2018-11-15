import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';

export interface IState {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const intialState: IState = {
    ingredients: [
        new Ingredient('bread', 5),
        new Ingredient('Green Tea', 2)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1,
};

export function shoppingListReducer(state = intialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:            
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };     
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }; 
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = { 
                ...ingredient,
                ...action.payload
            };

            const ingredients = [...state.ingredients];
            ingredients[state.editedIngredientIndex] = updatedIngredient;

            return {
                ...state,
                ingredients: ingredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            const oldIngredients = [...state.ingredients];
            oldIngredients.splice(state.editedIngredientIndex, 1);
            
            return {
                ...state,
                ingredients: oldIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        case ShoppingListActions.START_EDIT:
            const editedIngredient = { ...state.ingredients[action.payload] };
            return {
                ...state,
                editedIngredient: editedIngredient,
                editedIngredientIndex: action.payload
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        default:
            return state;
    }
}
