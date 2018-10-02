import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Chocolate Cake',
      'Great cake',
      'https://c1.staticflickr.com/6/5215/5459511727_ab1cbbf7ba_b.jpg',
      [
        new Ingredient('Flower', 1),
        new Ingredient('Eggs', 2),
        new Ingredient('Water', 1),
        new Ingredient('Chocolate', 1)
      ]),
    new Recipe('Pasta With Meat balls',
      'Italian recipe',
      'https://akispetretzikis.com/system/uploads/medium/data/4349/recipe_main_akis-petretzikis-zymarika-me-keftedakia-galopoulas.jpg',
      [
        new Ingredient('Pepper', 1),
        new Ingredient('Meat', 2),
        new Ingredient('Tomatos', 1),
      ])
  ];

  recipesChanged = new Subject<Recipe[]>();

  constructor() {
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
