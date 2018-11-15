import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ShoppingListComponent } from "./shopping/shopping-list.component";
import { HomeComponent } from './core/home/home.component';
import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
    // { path: '', redirectTo: 'recipes', pathMatch: 'full' },
    { path: '', component: HomeComponent },
    {
        path: 'recipes',
        loadChildren: './recipes/recipes.module#RecipesModule', // Lazy loading
        canLoad: [AuthGuard]
    },
    { path: 'shopping-list', component: ShoppingListComponent }
];

@NgModule({
    imports: [
        // Preloads all lazy loaded modules after the app has been run
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
