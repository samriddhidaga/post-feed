import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { DefaultService } from '../default.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
   
  userId;
  postData;
  userDetails;
  userName = '';
  apiPostList;
  loaderStart = false;
  totalPosts = 0;
  postPerPage = 5;
  currentPage = 0;
  pageSizeOptions=[1,2,5,10];

  constructor(private defaultService: DefaultService,
              private activatedRoute: ActivatedRoute) {
     
     this.userId = this.activatedRoute.snapshot.paramMap.get('userId');
     this.getUsersPosts();
   }

  ngOnInit() {
    this.getUser();
  }
   
  getUsersPosts() {
    this.loaderStart = true;
    this.defaultService.getUsersPosts(this.userId, '', '').subscribe((res:any) => {
      this.totalPosts = res.length
    });

    this.defaultService.getUsersPosts(this.userId, this.currentPage, this.postPerPage).subscribe((res:any) => {
      this.loaderStart = false;
      if(res.length > 0) {
        this.defaultService.snack("Post fetched successfully!")
        this.postData = res;
        this.apiPostList = res;
      }
    })
  }

  getUser() {
    this.defaultService.getUserByID(this.userId).subscribe((res:any) => {
       this.userDetails = res;
       this.userName = res.name
    })
  }
  getFilteredPosts(event) {
    this.postData = this.apiPostList.filter(post => post.title.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1);
  }

  onChangedPage(pageData : PageEvent){
    this.loaderStart=true;
    this.currentPage = (pageData.pageIndex)*this.postPerPage;
    this.postPerPage = pageData.pageSize
    this.defaultService.getUsersPosts(this.userId, this.currentPage, this.postPerPage).subscribe((res:any) => {
       this.loaderStart = false;
       this.postData = res
       this.apiPostList = res
    });
  }
}
