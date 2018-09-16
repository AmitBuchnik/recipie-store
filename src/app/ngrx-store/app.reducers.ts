import * as fromShoppingList from '../shopping/ngrx-store/shopping-list.reducers';
import * as fromAuth from '../auth/ngrx-store/auth.reducers';

export interface IAppState {
    shoppingList: fromShoppingList.IState;
    auth: fromAuth.IState;
}


