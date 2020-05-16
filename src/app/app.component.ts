import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onCreatePost(postData: { title: string; content: string }) {
    console.log(`postData says what?`,postData);
    // Send Http request
    this.http
      .post(
        // 'https://ng-complete-guide-c56d3.firebaseio.com/posts.json',
        'https://angular-exercise-twelve.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(`responseData says what?`,responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
  }
}
