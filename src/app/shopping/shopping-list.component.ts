import { Component, OnInit, OnDestroy } from '@angular/core';
import {  Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromShoppingList from '../shopping/ngrx-store/shopping-list.reducers';
import * as ShoppingListActions from './ngrx-store/shopping-list.actions';
import * as fromApp from '../ngrx-store/app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingListState: Observable<fromShoppingList.IState>;

  constructor(private store: Store<fromApp.IAppState>) {
  }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  ngOnDestroy() {
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
