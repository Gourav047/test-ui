import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';
import { AccountService } from './account/account.service';
import { stringToBase64 } from 'src/app/util/utilities';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _accountService:AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this._accountService.loginCred.pipe(
      take(1),
      exhaustMap(x=>{
        if(x.email === '' || x.password === ''){
          return next.handle(request);
        }
        const email = this._accountService.loginCred.value.email;
        const password =  this._accountService.loginCred.value.password;
    
        const authString = `${email}:${password}`;
        const encodedString = stringToBase64(authString);
        const authHeader = 'Basic ' + encodedString;
    
        // Clone the request and set the new header
        const authRequest = request.clone({
          setHeaders: {
            Authorization:authHeader
          }
        });
    
        return next.handle(authRequest);
      })
    )
  }
}
