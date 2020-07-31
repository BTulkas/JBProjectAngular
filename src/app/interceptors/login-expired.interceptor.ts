
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class LoginExpiredInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(
        (error: HttpErrorResponse)=>{
          if(error.status==401){
            if(error.error=="You have been inactive for too long. Just like your parents keep saying."){
              sessionStorage.clear();
            }
            this.router.navigate(["login"]);
            const newReq = request.clone({body: null});
            return next.handle(newReq);
          }
        })
        )
      }
}
