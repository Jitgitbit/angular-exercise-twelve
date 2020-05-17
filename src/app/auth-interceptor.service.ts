import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler){
    console.log("Request is on it's way");                   // even more granular control! even f.e. for authentication!
    console.log(`----> For which request did the interceptor run? (req.url):`,req.url);

    const modifiedRequest = req.clone(
      {headers: req.headers.append('Auth', 'xyz')}      //(fictional headers)
    )
    return next.handle(modifiedRequest)
      .pipe(
        tap(event => {                                             // you could use map instead of tap, and thus even transform the response here !!!
          console.log(`What's the response event here?`,event)
          if(event.type === HttpEventType.Response){
            console.log('Response arrived, event body is:', event.body);
          }
        })
      ); 
  };
}