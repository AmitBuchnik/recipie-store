import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeRouteActivatorGuard implements CanActivate {
  constructor(private recipeService: RecipeService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const recipeExists: boolean = !!this.recipeService.getRecipe(+next.params['id']);
    return recipeExists;
  }
}
