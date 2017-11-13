import {SF1Service} from '../sf1.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'
import { SF1SearchExp } from '../sf1-search.service';

@Component({
  selector: 'app-simple-search',
  templateUrl: './simple-search.component.html',
  styleUrls: ['./simple-search.component.css']
})
export class SimpleSearchComponent implements OnInit {

  searchKeyword: string

  constructor(
    private router: Router,
    private user: UserService,
    private sf1: SF1Service,
    private searchExp: SF1SearchExp
  ) { }

  ngOnInit() {
  }

  doSearch() {
    if (this.searchKeyword) {
      const exp = this.searchExp.buildKeySearch(this.searchKeyword)
      const dbs = 'FMZL,FMSQ,SYXX,WGZL'
      this.sf1.redirectUrl = '/sf1/simple'
      this.router.navigate(['/sf1/list'], { queryParams: { exp, dbs } });
    }
  }

  doClear() {
    if (this.searchKeyword) {
      this.searchKeyword = ''
    }
  }

}
