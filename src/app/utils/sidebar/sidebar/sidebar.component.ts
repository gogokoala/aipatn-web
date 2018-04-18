import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from '../../utils.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input()
  actGroup:string=""

  activeIndex:number=-1
  menus:any;

  constructor(
    private utils:UtilsService
  ) { 
    this.menus=utils.menus;
  }

  ngOnInit() {
    this.menus.forEach((item,index) => {
      if (item.group==this.actGroup){
        this.activeIndex=index
      }
      
    });
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
