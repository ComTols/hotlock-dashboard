import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request)
    if (this.auth.log) {
      const clonedRequest = request.clone({
        headers:request.headers.set("Authorization", "Bearer " + this.auth.token)
      })
      return next.handle(clonedRequest)
    }
    return next.handle(request);
  }
}
