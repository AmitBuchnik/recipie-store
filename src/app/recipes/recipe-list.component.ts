import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRecipe from './ngrx-store/recipe.reducers';
import * as RecipeActions from './ngrx-store/recipe.actions';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeListState: Observable<fromRecipe.IState>;
  // subscription: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipe.IFeatureState>) {
  }

  ngOnInit() {
    // this.store.dispatch(new RecipeActions.FetchRecipes());
    this.recipeListState = this.store.select('recipes');

    // this.recipes = this.recipeService.getRecipes();

    // this.subscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
    //   this.recipes = recipes;
    // });
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
