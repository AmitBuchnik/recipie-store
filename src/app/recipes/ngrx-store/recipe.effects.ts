import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { HttpRequest, HttpClient, HttpHeaders } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom  } from "rxjs/operators";

import * as RecipeActions from './recipe.actions';
import * as fromRecipe from './recipe.reducers';
import { Recipe } from "../recipe.model";

@Injectable()
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
        }),
            map((recipes) => {
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

    @Effect({ dispatch: false }) recipeStore = this.actions$
        .ofType(RecipeActions.STORE_RECIPES)
        .pipe(withLatestFrom(this.store.select('recipes')),
            switchMap(([action, state]) => {
                const request = new HttpRequest('PUT', 'https://ng-recipe-book-975b7.firebaseio.com/recipes.json',
                    state.recipes, {
                        reportProgress: true
                    });
                return this.httpClient.request(request);
            }));
    
    constructor(private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromRecipe.IFeatureState>) {
    }
}
