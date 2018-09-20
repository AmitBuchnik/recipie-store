import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route
} from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators/map';
import { take } from 'rxjs/operators/take';

import * as fromApp from '../ngrx-store/app.reducers';
import * as fromAuth from './ngrx-store/auth.reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router,
    private store: Store<fromApp.IAppState>) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('auth')
      .pipe(take(1))
      .pipe(map((authState: fromAuth.IState) => {
        if (authState.authenticated) {
          return true;
        }
        this.router.navigate(['/recipes']);
        return false;
      }));
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.store.select('auth')
      .pipe(take(1))
      .pipe(map((authState: fromAuth.IState) => {
        return authState.authenticated;
      }));
  }
}
