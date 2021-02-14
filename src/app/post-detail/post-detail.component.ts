import { Component, OnInit } from '@angular/core';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultService } from '../default.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  postId;
  postData = '';
  loaderStart = false;
  showComments = false;
  comments;
  userId;
  apiData;

  constructor(private defaultService: DefaultService,
             private activatedRoute: ActivatedRoute,
             private router: Router) { 
     
      this.postId = this.activatedRoute.snapshot.paramMap.get('postId');
  }

  ngOnInit() {
    this.getPostDetail();
  }

  getPostDetail() {
    this.loaderStart = true;
    this.defaultService.getPostDetail(this.postId).subscribe((res:any) => {
       this.loaderStart = false;
       this.showComments = false;
       this.defaultService.snack("Details fetched successfully!");
       this.postData = res;
       this.apiData = res;
       this.userId = res.userId;
       this.getPostComments();
    })
  }

  getPostComments() {
    this.loaderStart = true;
    this.defaultService.getPostComments(this.postId).subscribe((res:any) => {
        this.loaderStart = false;
        this.comments = res;
    })
  }

  deletePost() {
    this.loaderStart = true;
    this.defaultService.deletePosts(this.postId).subscribe((res:any) => {
       this.loaderStart = false;
        if(res) {
          this.router.navigate(['/post/'+this.userId]);
          this.defaultService.snack("Post deleted successfully!");
        }
    })
  }

  showComment() {
    this.showComments = this.showComments == true ? false : true;
  }

  // getFilteredData(event) {
  //   this.postData = this.apiData.filter(post => (post.title || post.body).toLowerCase().indexOf(event.target.value.toLowerCase()) > -1)
  // }

}
