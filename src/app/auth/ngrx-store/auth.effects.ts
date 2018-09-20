import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { tap } from 'rxjs/operators/tap';
import { from } from 'rxjs/observable/from';
import * as firebase from 'firebase';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions,
        private router: Router) {
    }

    @Effect({ dispatch: true }) authSignup = this.actions$
        .ofType(AuthActions.TRY_SIGNUP)
        .pipe(map((action: AuthActions.TrySignup) => {
            return action.payload;
        }))
        .pipe(switchMap((authData: { username: string, password: string }) => {
            return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
        }))
        .pipe(switchMap(() => {
            return from(firebase.auth().currentUser.getIdToken());
        }))
        .pipe(mergeMap((token: string) => {
            this.router.navigate(['/']);
            
            return [
                {
                    type: AuthActions.SIGNUP
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ];
        }));
    
    @Effect() authSignin = this.actions$
        .ofType(AuthActions.TRY_SIGNIN)
        .pipe(map((action: AuthActions.TrySignin) => {
            return action.payload;
        }))
        .pipe(switchMap((authData: { username: string, password: string }) => {
            return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
        }))
        .pipe(switchMap(() => {
            return from(firebase.auth().currentUser.getIdToken());
        }))
        .pipe(mergeMap((token: string) => {
            this.router.navigate(['/']);

            return [
                {
                    type: AuthActions.SIGNIN
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ];
        }));
    
    @Effect({ dispatch: false }) authLogout = this.actions$
        .ofType(AuthActions.LOGOUT)
        .pipe(tap(() => {
            firebase.auth().signOut();
            this.router.navigate(['/']);
        }));
}
