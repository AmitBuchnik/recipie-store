import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: Http,
    private recipeService: RecipeService) {
  }

  storeRecipes(): Observable<Response> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://ng-recipe-book-975b7.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(), { headers: headers });
  }

  getRecipes() {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    this.http.get('https://ng-recipe-book-975b7.firebaseio.com/recipes.json',
      { headers: headers })
      .pipe(map((response: Response) => {
        const recipes: Recipe[] = response.json();
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];  
          }
        }
        return recipes;
      }))
      .subscribe((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
