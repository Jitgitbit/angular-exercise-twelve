import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import {map, catchError, tap} from 'rxjs/operators';                       //no auto -import for this one ! unusual
import { Subject, throwError } from 'rxjs';

import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string){
    const postData: Post = {title: title, content: content};
    console.log(`postData says what?`,postData);
    // Send Http request
    this.http
      .post<{name: string}>(
        // Don't forget to put the read and write rules of the Realtime database in FireBase to true !!!!! 
        'https://angular-exercise-twelve.firebaseio.com/posts.json',
        postData,
        // {
        //   observe: 'body'              // this is the default
        // }
        {
          observe: 'response'              // full response, including status code, etc...
        }
      )
      .subscribe(
        responseData => {
          console.log(`responseData says what?`,responseData);
        },
        error => {
          this.error.next(error.message);
        }
      );
  }
  fetchPosts(){
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');           //print,pretty is supported by firebase, prints in a prettier way
    searchParams = searchParams.append('custom','key');             //custom,key is NOT supported by firebase, just to show how to add queryParams !

    return this.http
      .get<{[key: string]: Post}>(
        'https://angular-exercise-twelve.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({'Custom-header': 'Hello'}),
          // params: new HttpParams().set('print', 'pretty')
          params: searchParams
        }
      )
      .pipe(
        map(responseData => {
        // map((responseData: { [key: string]: Post }) => {
          const postsArray: Post[] = [];
          for(const key in responseData){
            if(responseData.hasOwnProperty(key)){
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError(errorRes => {
          // Send to analytics server f.e.
          return throwError(errorRes);
        })
      )   
  }
  deletePosts(){
    return this.http.delete(
      'https://angular-exercise-twelve.firebaseio.com/posts.json',
      {
        observe: 'events'
      }
    ).pipe(
      tap(event => {
        console.log(`----> What event is being tapped here:`,event);
        if(event.type === HttpEventType.Response){
          console.log(`====>> What event.body is being tapped here:`,event.body);
        }
      })
    );
  }
}