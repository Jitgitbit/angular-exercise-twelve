import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';                       //no auto -import for this one ! unusual

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    console.log(`postData says what?`,postData);
    // Send Http request
    this.http
      .post(
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
    this.http
      .get('https://angular-exercise-twelve.firebaseio.com/posts.json')
      .pipe(map(responseData => {
        const postsArray = [];
        for(const key in responseData){
          if(responseData.hasOwnProperty(key)){
            postsArray.push({ ...responseData[key], id: key });
          }
        }
        return postsArray;
      }))
      .subscribe(posts => {
        console.log(`fetchPosts posts says what?`,posts);
      })
  }
}
