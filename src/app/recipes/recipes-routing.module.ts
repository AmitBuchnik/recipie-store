import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { RecipeDetailComponent } from './recipe-detail.component';
import { RecipeResolver } from './recipe-resolver.service';
import { RecipeRouteActivatorGuard } from './recipe-route-activator.guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { AuthGuard } from '../auth/auth-guard';

const routes: Routes = [
    {
        path: '',
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
                component: RecipeDetailComponent
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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {
}
