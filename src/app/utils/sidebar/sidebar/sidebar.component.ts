import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../utils.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  activeIndex:number=-1;
  menus:any;

  constructor(
    private utils:UtilsService
  ) { 
    this.menus=utils.menus;
  }

  ngOnInit() {
  }

  menuOnClick(i){
    if (this.activeIndex==i){
      this.activeIndex=-1;
    }
    else{
      this.activeIndex=i;
    }
  }

}
