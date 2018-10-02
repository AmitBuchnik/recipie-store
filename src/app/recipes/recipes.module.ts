import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail.component';
import { RecipeItemComponent } from './recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { recipeReducer } from './ngrx-store/recipe.reducers';
import { RecipeEffects } from './ngrx-store/recipe.effects';

@NgModule({
  imports: [
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule,
    StoreModule.forFeature('recipes', recipeReducer),
    EffectsModule.forFeature([RecipeEffects])
  ],
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ]
})
export class RecipesModule { }
