import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import * as fromRecipe from './ngrx-store/recipe.reducers';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<Observable<Recipe>> {

  constructor(private recipeService: RecipeService,
    private store: Store<fromRecipe.IFeatureState>) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Recipe> {
    // return this.recipeService.getRecipe(+route.params['id']);

    return this.store.select('recipes')
      .pipe(take(1),
        map((recipeState: fromRecipe.IState) => {
          return recipeState.recipes[+route.params['id']];
        }));
  }
}
