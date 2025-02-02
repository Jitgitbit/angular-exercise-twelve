import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptorService } from './auth-interceptor.service';
import { AppComponent } from './app.component';
import { LoggingInterceptorService } from './logging-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,                     // HTTP_INTERCEPTORS is the token to recognize, the dependency identifier
      useClass: AuthInterceptorService,              // with useClass you point where you want to use this interception
      multi: true                                   //----> here just stating that there is more than one interceptor, and it should not overwrite the existing ones!
    },
    {
      provide: HTTP_INTERCEPTORS,                     // HTTP_INTERCEPTORS is the token to recognize, the dependency identifier
      useClass: LoggingInterceptorService,           // with useClass you point where you want to use this interception
      multi: true                                   //----> here just stating that there is more than one interceptor, and it should not overwrite the existing ones!
    },                                             //=====>> THE ORDER OR SEQUENCE IS OF ESSENTIAL IMPORTANCE,   BEWARE !!!
  ], 
  bootstrap: [AppComponent]
})
export class AppModule {}
