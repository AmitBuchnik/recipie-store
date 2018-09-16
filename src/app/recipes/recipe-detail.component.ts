import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Store } from '@ngrx/store';

import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import * as ShoppingListActions from '../shopping/ngrx-store/shopping-list.actions';
import * as fromApp from '../ngrx-store/app.reducers';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  @Input() recipe: Recipe;
  subscription: Subscription;
  id: number;

  // constructor(private route: ActivatedRoute) { }
  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.IAppState>) {
  }

  ngOnInit() {
    // this.route.data.subscribe((data) => {
    //   this.recipe = data['recipe'];
    // });

    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      });
    
    this.subscription = this.recipeService.recipesChanged
      .subscribe((recipes: Recipe[]) => {
        this.recipe = recipes[this.id];
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddToShoppingList(): void {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}

