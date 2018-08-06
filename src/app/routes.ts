import { Routes } from '@angular/router';

import { ShoppingListComponent } from "./shopping/shopping-list.component";
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail.component';
import { RecipeResolver } from './recipes/recipe-resolver.service';
import { RecipeRouteActivatorGuard } from './recipes/recipe-route-activator.guard';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

export const routes: Routes = [
    { path: '', redirectTo: 'recipes', pathMatch: 'full' },
    {
        path: 'recipes',
        component: RecipesComponent,
        children: [
            {
                path: '',
                component: RecipeStartComponent,
                pathMatch: 'full'
            },
            {
                path: 'new',
                component: RecipeEditComponent
            },
            {
                path: ':id',
                component: RecipeDetailComponent,
                // canActivate: [RecipeRouteActivatorGuard],
                // resolve: { recipe: RecipeResolver }
            },
            {
                path: ':id/edit',
                component: RecipeEditComponent
            }
        ]
    },
    { path: 'shopping-list', component: ShoppingListComponent },
];
