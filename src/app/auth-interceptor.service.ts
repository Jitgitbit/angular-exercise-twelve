import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler){
    console.log("Request is on it's way");                   // even more granular control! even f.e. for authentication!
    console.log(`----> For which request did the interceptor run? (req.url):`,req.url);
    const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')})
    return next.handle(modifiedRequest); 
  };
}