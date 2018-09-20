 import { Injectable } from '@angular/core';
// import { Headers, Response } from '@angular/http';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpEvent,
  HttpParams,
  HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators/map';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private httpClient: HttpClient,
    private recipeService: RecipeService) {
  }

  // storeRecipes(): Observable<HttpEvent<Recipe[]>> {
  //   const token = this.authService.getToken();

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });
  //   return this.httpClient.put<Recipe[]>('https://ng-recipe-book-975b7.firebaseio.com/recipes.json?auth=' + token,
  //     this.recipeService.getRecipes(),
  //     {
  //       headers: headers,
  //       observe: 'events' // request and response events
  //     });
  // }

  storeRecipes(): Observable<HttpEvent<Recipe[]>> {
    // const token = this.authService.getToken();

    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });
    
    // headers.set('Content-Type', 'application/json');
    // headers.append('Content-Type', 'application/json');

    // return this.httpClient.put<Recipe[]>('https://ng-recipe-book-975b7.firebaseio.com/recipes.json',
    //   this.recipeService.getRecipes(),
    //   {
    //     // headers: headers,
    //     params: new HttpParams().set('auth', token)
    //   });


    // Useful for uploading and downloading files (progressbar)
    const request = new HttpRequest('PUT', 'https://ng-recipe-book-975b7.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(), {
        // params: new HttpParams().set('auth', token),
        reportProgress: true
      });
    return this.httpClient.request(request);
  }

  getRecipes() {
    // const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // With HttpClient the body of the response is extracted by default (as json)
    this.httpClient.get<Recipe[]>('https://ng-recipe-book-975b7.firebaseio.com/recipes.json',
      {
        // headers: headers,
        // observe: 'body',
        // responseType: 'json',
        // params: new HttpParams().set('auth', token)
      }
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
    //     headers: headers,
    //     observe: 'response', // 'body', 'events'
    //     responseType: 'text' // 'json'. 'blob', 'array'
    //   })
    //   .pipe(map((response) => {
    //     console.log(response);
    //     return [];
    //   }));
  }
}
