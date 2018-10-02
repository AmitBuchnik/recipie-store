import { ActionReducerMap } from "@ngrx/store";

import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../ngrx-store/app.reducers';

export interface IFeatureState extends fromApp.IAppState {
    recipes: IState;
}

export interface IState {
    recipes: Recipe[];
}

const intialState: IState = {
    recipes: [
        new Recipe('Chocolate Cake',
            'Great cake',
            'https://img.taste.com.au/LHfi_7cR/w1200-h630-cfill/taste/2016/11/flourless-chocolate-hazelnut-cake-50137-1.jpeg',
            [
                new Ingredient('Flower', 1),
                new Ingredient('Eggs', 2),
                new Ingredient('Water', 1),
                new Ingredient('Chocolate', 1)
            ]),
        new Recipe('Pasta With Meat balls',
            'Italian recipe',
            // tslint:disable-next-line:max-line-length
            'https://akispetretzikis.com/system/uploads/medium/data/4349/recipe_main_akis-petretzikis-zymarika-me-keftedakia-galopoulas.jpg',
            [
                new Ingredient('Pepper', 1),
                new Ingredient('Meat', 2),
                new Ingredient('Tomatos', 1),
            ])
    ]
};

export function recipeReducer(state = intialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case RecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        
        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        
        case RecipeActions.UPDATE_RECIPE:
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.recipe
            };
            
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;

            return {
                ...state,
                recipes: recipes
            };
        
        case RecipeActions.DELETE_RECIPE:
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);

            return {
                ...state,
                recipes: oldRecipes
            };
        
        default:
            return state;
    }
}
