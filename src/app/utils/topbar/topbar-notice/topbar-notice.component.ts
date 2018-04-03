import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar-notice',
  templateUrl: './topbar-notice.component.html',
  styleUrls: ['./topbar-notice.component.css']
})
export class TopbarNoticeComponent implements OnInit {

  notice:any={
    hover:false
  }

  constructor() { }

  ngOnInit() {
  }

  noticeOnMouseEnter(event){
    this.notice.hover=true;
  }

  noticeOnMouseLeave(event){
    this.notice.hover=false;    
  }
}
