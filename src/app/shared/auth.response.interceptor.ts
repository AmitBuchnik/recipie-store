import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { Injectable } from "@angular/core";
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthResponseInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // printing the intercepted response
        return next.handle(req).pipe(tap(event => {
            console.log('Response Intercepted', event);
        }));
    }
}


