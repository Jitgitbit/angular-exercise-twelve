import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';                       //no auto -import for this one ! unusual

import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.isFetching = true;
    this.postsService.fetchPosts()
      .subscribe(posts => {
        console.log(`fetchPosts posts says what?`,posts);
        this.isFetching = false;
        this.loadedPosts = posts;
      })
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
      })
  }

  onClearPosts() {
    // Send Http request
  }
}
