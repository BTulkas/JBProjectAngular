
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private router:Router, private location:Location) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(
        (error: HttpErrorResponse)=>{
          // Catches unauthorised requests
          if(error.status==401){
            // Specifically catches LoginExpiredException and performs client-side logout
            if(error.error=="You have been inactive for too long. Just like your parents keep saying."){
              sessionStorage.clear();
            }
            // Unauthorised requests will be thrown back to login page
            this.router.navigate(["login"]);
            // Sends the request on for any additional handling in the component
            return next.handle(request);
            // All other erros will navigate the user one page back
          } else{
            // Using location.back() prevents additional handling in offending component, so alert is thrown here
            alert(error.error);
            this.location.back();
          }
        })
        );
      }
}
