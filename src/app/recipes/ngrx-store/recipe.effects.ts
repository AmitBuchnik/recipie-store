import { Effect, Actions } from "@ngrx/effects";
import { HttpRequest, HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators/map";
import { switchMap } from "rxjs/operators/switchMap";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators/take";

import * as RecipeActions from './recipe.actions';
import * as fromRecipe from './recipe.reducers';
import { Recipe } from "../recipe.model";

export class RecipeEffects {
    @Effect() recipeFetch = this.actions$
        .ofType(RecipeActions.FETCH_RECIPES)
        .pipe(switchMap((action: RecipeActions.FetchRecipes) => {
            // const token = this.authService.getToken();

            // const headers = new HttpHeaders({
            //     'Content-Type': 'application/json'
            // });
            
            return this.httpClient.get<Recipe[]>('https://ng-recipe-book-975b7.firebaseio.com/recipes.json',
                {
                    // headers: headers,
                    // observe: 'body',
                    // responseType: 'json',
                    // params: new HttpParams().set('auth', token)
                });
        }))
        .pipe(map((recipes) => {
            for (const recipe of recipes) {
                if (!recipe['ingredients']) {
                    recipe['ingredients'] = [];
                }
            }
            return {
                type: RecipeActions.SET_RECIPES,
                payload: recipes
            };
        }));

    @Effect() recipeStore = this.actions$
        .ofType(RecipeActions.STORE_RECIPES)
        .pipe(switchMap((action: RecipeActions.StoreRecipes) => {
            return this.store.select('recipes')
                .pipe(take(1))
                .pipe(switchMap((recipeState: fromRecipe.IState) => {
                    const request = new HttpRequest('PUT', 'https://ng-recipe-book-975b7.firebaseio.com/recipes.json',
                        recipeState.recipes, {
                            reportProgress: true
                        });
                    return this.httpClient.request(request);
                }));
        }));
    
    constructor(private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromRecipe.IFeatureState>) {
    }
}
