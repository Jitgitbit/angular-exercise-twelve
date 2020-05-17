import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler){
    console.log("Request is on it's way");                   // even more granular control!
    return next.handle(req); 
  };
}