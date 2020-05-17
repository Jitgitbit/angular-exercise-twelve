import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';                       //no auto -import for this one ! unusual
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
        postData
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
    return this.http
      .get<{[key: string]: Post}>(
        'https://angular-exercise-twelve.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({'Custom-header': 'Hello'}),
          params: new HttpParams().set('print', 'pretty')
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
    return this.http.delete('https://angular-exercise-twelve.firebaseio.com/posts.json')
  }
}