import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { switchMap } from "rxjs/operators/switchMap";
import { take } from "rxjs/operators/take";

import * as fromApp from '../ngrx-store/app.reducers';
import * as fromAuth from '../auth/ngrx-store/auth.reducers';

@Injectable()
export class AuthRequestInterceptor implements HttpInterceptor {
    constructor(private store: Store<fromApp.IAppState>) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Request Intercepted', req);

        return this.store.select('auth')
            .pipe(take(1))
            .pipe(switchMap((authState: fromAuth.IState) => {
                const copiedReq = req.clone({
                    params: req.params.set('auth', authState.token)
                });
                return next.handle(copiedReq);
            }));
    }
}


