import { Routes } from '@angular/router';

import { ShoppingListComponent } from "./shopping/shopping-list.component";
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail.component';
import { RecipeResolver } from './recipes/recipe-resolver.service';
import { RecipeRouteActivatorGuard } from './recipes/recipe-route-activator.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'recipes', pathMatch: 'full' },
    {
        path: 'recipes',
        component: RecipesComponent
    },
    // {
    //     path: 'recipes/:id',
    //     component: RecipeDetailComponent,
    //     canActivate: [RecipeRouteActivatorGuard],
    //     resolve: { recipe: RecipeResolver }
    // },
    { path: 'shopping-list', component: ShoppingListComponent },
];
