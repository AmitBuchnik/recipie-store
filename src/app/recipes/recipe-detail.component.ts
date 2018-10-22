import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  group
} from '@angular/animations';

import * as ShoppingListActions from '../shopping/ngrx-store/shopping-list.actions';
import * as fromRecipe from './ngrx-store/recipe.reducers';
import * as RecipeActions from './ngrx-store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  // @Input() recipe: Recipe;
  recipeState: Observable<fromRecipe.IState>;
  // subscription: Subscription;
  id: number;

  // constructor(private route: ActivatedRoute) { }
  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipe.IFeatureState>) {
  }

  ngOnInit() {
    // this.route.data.subscribe((data) => {
    //   // this.recipe = data['recipe'];
    //   data['recipe']
    //     .subscribe(recipe => this.recipe = recipe);
    // });

    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.recipeState = this.store.select('recipes');
        // this.recipe = this.recipeService.getRecipe(this.id);
      });

    // this.subscription = this.recipeService.recipesChanged
    //   .subscribe((recipes: Recipe[]) => {
    //     this.recipe = recipes[this.id];
    // });
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  onAddToShoppingList(): void {
    this.store.select('recipes')
      .pipe(take(1))
      .subscribe((recipeState: fromRecipe.IState) => {
        this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.id].ingredients));
      });
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}

