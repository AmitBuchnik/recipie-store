import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver {

  constructor(private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot): Recipe {
    return this.recipeService.getRecipe(+route.params['id']);
  }
}
