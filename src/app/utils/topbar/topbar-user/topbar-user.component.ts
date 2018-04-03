import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar-user',
  templateUrl: './topbar-user.component.html',
  styleUrls: ['./topbar-user.component.css']
})
export class TopbarUserComponent implements OnInit {
  
  user:any= {
    hover:false
  }

  constructor() { }

  ngOnInit() {
  }

  userOnMouseEnter(event){
    this.user.hover=true;
  }

  userOnMouseLeave(event){
    this.user.hover=false;    
  }

}
