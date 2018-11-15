import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
// import { HttpResponse, HttpEvent, HttpEventType } from '@angular/common/http';

import * as fromApp from '../../ngrx-store/app.reducers';
import * as fromAuth from '../../auth/ngrx-store/auth.reducers';
import * as AuthActions from '../../auth/ngrx-store/auth.actions';
import * as RecipeActions from '../../recipes/ngrx-store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.IState>;

  constructor(private store: Store<fromApp.IAppState>) {
  }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  // onSaveData() {
  //   this.dataStorageService.storeRecipes()
  //     .subscribe((response: HttpEvent<Recipe[]>) => {
  //       console.log(response.type === HttpEventType.Sent);
  //     });
  // }

  // onSaveData() {
  //   this.dataStorageService.storeRecipes()
  //     .subscribe((recipes: Recipe[]) => {
  //       console.log(recipes);
  //     });
  // }

  onSaveData() {
    // this.dataStorageService.storeRecipes()
    //   .subscribe(Response => {
    //     console.log(Response);
    //   });

    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    // this.dataStorageService.getRecipes();
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
