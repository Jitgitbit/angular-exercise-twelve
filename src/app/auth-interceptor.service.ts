import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
// import { map, tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler){
    // console.log("Request is on it's way");                   // even more granular control! even f.e. for authentication!
    // console.log(`----> For which request did the interceptor run? (req.url):`,req.url);

    const modifiedRequest = req.clone(
      {headers: req.headers.append('Auth', 'xyz')}      //(fictional headers)
    )
    return next.handle(modifiedRequest);
  }
}