import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';                       //no auto -import for this one ! unusual

import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    console.log(`postData says what?`,postData);
    // Send Http request
    this.http
      .post<{name: string}>(
        // Don't forget to put the read and write rules of the Realtime database in FireBase to true !!!!! 
        'https://angular-exercise-twelve.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(`responseData says what?`,responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts(){
    this.isFetching = true;
    this.http
      .get<{[key: string]: Post}>('https://angular-exercise-twelve.firebaseio.com/posts.json')
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
        }))
      .subscribe(posts => {
        console.log(`fetchPosts posts says what?`,posts);
        this.isFetching = false;
        this.loadedPosts = posts;
      })
  }
}
