import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class LoggingInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler){
    console.log('Outgoing request is to ?(req.url):', req.url); 
    console.log('Show me these headers, sequence matters (req.headers):', req.headers); 

    return next.handle(req)
      .pipe(
        tap(event => {                                            //----------> you could use map instead of tap, and thus even transform the response here !!!
          if(event.type === HttpEventType.Response){
            console.log('Incoming response is ?(event.body):', event.body); 
          }
        })
      ); 
  }
} 