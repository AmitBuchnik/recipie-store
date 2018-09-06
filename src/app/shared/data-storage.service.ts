import { Injectable } from '@angular/core';
// import { Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) {
  }

  storeRecipes(): Observable<Recipe[]> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.put<Recipe[]>('https://ng-recipe-book-975b7.firebaseio.com/recipes.json?auth=' + token,
      this.recipeService.getRecipes(), { headers: headers });
  }

  getRecipes() {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // With HttpClient the body of the response is extracted by default (as json)
    this.httpClient.get<Recipe[]>('https://ng-recipe-book-975b7.firebaseio.com/recipes.json?auth=' + token
      // ,
      // {
      //   headers: headers,
      //   observe: 'body',
      //   responseType: 'json'
      // }
    )
      .pipe(map((recipes) => {
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

    // this.httpClient.get('https://ng-recipe-book-975b7.firebaseio.com/recipes.json?auth=' + token,
    //   {
    //     observe: 'response', // 'body'
    //     responseType: 'text' // 'json'. 'blob', 'array'
    //   })
    //   .pipe(map((response) => {
    //     console.log(response);
    //     return [];
    //   }));
  }
}
