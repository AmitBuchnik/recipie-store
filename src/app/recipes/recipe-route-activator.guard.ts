import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { RecipeService } from './recipe.service';
import * as fromRecipe from './ngrx-store/recipe.reducers';

@Injectable({
  providedIn: 'root'
})
export class RecipeRouteActivatorGuard implements CanActivate {
  constructor(private recipeService: RecipeService,
    private store: Store<fromRecipe.IFeatureState>) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // const recipeExists: boolean = !!this.recipeService.getRecipe(+next.params['id']);
    // return recipeExists;

    return this.store.select('recipes')
      .pipe(take(1),
        map((recipeState: fromRecipe.IState) => {
          const recipeExists: boolean = !!recipeState.recipes[+next.params['id']];
          return recipeExists;
        }));
  }
}
