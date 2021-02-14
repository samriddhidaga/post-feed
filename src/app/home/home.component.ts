import { Component, OnInit, ViewChild } from '@angular/core';
import { DefaultService } from '../default.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
   displayedColumns = ['name','company','action'];
   listData: MatTableDataSource<any>;
   apiNameList;
   cardList;
   loaderStart = false;
   viewAsTable = true;
   viewAsCard = false;
   viewAsPanel = false;

  constructor(private defaultService: DefaultService) { 
     this.getUsers();
  }

  ngOnInit() {
  }

  getUsers() {
    this.loaderStart = true;
   // console.log(this.loaderStart);
    this.defaultService.getUsers().subscribe((res:any) => {
      this.loaderStart = false;
      if(res.length > 0) {
        console.log(res);
        this.defaultService.snack("Users fetched");
        this.listData = new MatTableDataSource(res);
        this.listData.paginator = this.paginator;
        this.cardList = res;
        this.apiNameList = res;
      }
    })
  }
  
  
  getFilteredUsers(event) {
     if(this.viewAsTable) {
      this.listData = this.apiNameList.filter(user => user.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1);
     } else {
      this.cardList = this.apiNameList.filter(user => user.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1);
     }
  }

  getFilteredCompany(event) {
    if(this.viewAsTable) {
      this.listData = this.apiNameList.filter(company => company.company.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1);
    } else {
      this.cardList = this.apiNameList.filter(company => company.company.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1);
    }
  }

  onChangeView(str) {
      if(str === 'table') {
        this.viewAsTable = true;
        this.viewAsCard = false;
        this.viewAsPanel = false;
      } else if(str === 'card'){
        this.viewAsCard = true;
        this.viewAsTable = false;
        this.viewAsPanel = false;
      } else {
         this.viewAsPanel = true;
         this.viewAsCard = false;
         this.viewAsTable = false;
      }
  }
}
