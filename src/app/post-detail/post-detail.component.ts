import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultService } from '../default.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  postId;
  postTitle='';
  postBody='';
  loaderStart = false;
  showComments = false;
  comments;
  userId;

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
       this.postTitle = res.title;
       this.postBody = res.body;
       this.userId = res.userId;
       this.getPostComments();
    })
  }

  getPostComments() {
    this.defaultService.getPostComments(this.postId).subscribe((res:any) => {
        this.comments = res;
    })
  }

  deletePost() {
    console.log(this.postId);
    this.defaultService.deletePosts(this.postId).subscribe((res:any) => {
        if(res) {
          this.router.navigate(['/post/'+this.userId]);
          this.defaultService.snack("Post deleted successfully!");
        }
    })
  }

  showComment() {
    this.showComments = this.showComments == true ? false : true;
  }

}
