import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils/utils.service';

@Component({
  selector: 'app-userdesk',
  templateUrl: './userdesk.component.html',
  styleUrls: ['./userdesk.component.css']
})
export class UserDeskComponent implements OnInit {

  menus:any;

  constructor(
    private utils:UtilsService
  ) {
    this.menus=utils.menus
  }

  ngOnInit() {
  }

}
