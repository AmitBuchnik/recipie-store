import { Routes } from '@angular/router';

import { ShoppingListComponent } from "./shopping/shopping-list.component";
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail.component';
import { RecipeResolver } from './recipes/recipe-resolver.service';
import { RecipeRouteActivatorGuard } from './recipes/recipe-route-activator.guard';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuard } from './auth/auth-guard';

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
                component: RecipeEditComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ':id',
                component: RecipeDetailComponent,
                // canActivate: [RecipeRouteActivatorGuard],
                // resolve: { recipe: RecipeResolver }
            },
            {
                path: ':id/edit',
                component: RecipeEditComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
];
