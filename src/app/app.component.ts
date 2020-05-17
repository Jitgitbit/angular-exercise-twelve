import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';                       //no auto -import for this one ! unusual
import { Subscription } from 'rxjs';

import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private errorSub : Subscription;

  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe(
      errorMessage => {
        this.error = errorMessage;
      }
    )
    this.isFetching = true;
    this.postsService.fetchPosts()
      .subscribe(posts => {
        console.log(`fetchPosts posts says what?`,posts);
        this.isFetching = false;
        this.loadedPosts = posts;
      }, error => {
        this.isFetching = false;
        this.error = error.message; 
        console.log(`the full error.message says what?`,error)
      });
  }
  ngOnDestroy(){
    this.errorSub.unsubscribe();
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content);
  }
  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchPosts()
      .subscribe(posts => {
        console.log(`fetchPosts posts says what?`,posts);
        this.isFetching = false;
        this.loadedPosts = posts;
      }, error => {
        this.isFetching = false;
        this.error = error.message; 
        console.log(`the full error.message says what?`,error)
      });
  }
  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts()
      .subscribe(() => {
        this.loadedPosts = []
      });
  }
  onHandleError(){
    this.error = null;
  }
}
