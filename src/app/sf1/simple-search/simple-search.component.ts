import {SF1Service} from '../sf1.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service'
import { SF1SearchExp } from '../sf1-search.service';

@Component({
  selector: 'app-simple-search',
  templateUrl: './simple-search.component.html',
  styleUrls: ['./simple-search.component.css']
})
export class SimpleSearchComponent implements OnInit {

  searchKeyword: string
  error: any

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private user: UserService,
    private sf1: SF1Service,
    private searchExp: SF1SearchExp
  ) { }

  ngOnInit() {
    /*
    this.route.params.subscribe(q => {
      const status = q.status
      const message = q.message
      if (status && status !== '0') {
        this.error = { status, message }
        setTimeout(() => { this.error = null }, 10000)
      }
    })
    */
    this.error = {
      status: '401',
      message: '检索结果为空'
    }
    setTimeout(() => { this.error = null }, 10000)

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
