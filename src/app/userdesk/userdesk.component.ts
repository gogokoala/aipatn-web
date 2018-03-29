import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-userdesk',
  templateUrl: './userdesk.component.html',
  styleUrls: ['./userdesk.component.css']
})
export class UserDeskComponent implements OnInit {

  menus:any;

  constructor(
    private common:CommonService
  ) {
    this.menus=common.menus
  }

  ngOnInit() {
  }

}
