import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { SF1Service, SF1Response, SF1SearchParams } from '../sf1.service'
import { SF1SearchExp } from '../sf1-search.service'
import * as moment from 'moment'

@Component({
  selector: 'app-sf1-list',
  templateUrl: './sf1-list.component.html',
  styleUrls: ['./sf1-list.component.css']
})
export class SF1ListComponent implements OnInit {

  filter_items: any[] = [
    { id: 1, name: '国家' },
    { id: 2, name: '申请人' },
    { id: 3, name: '申请日' },
    { id: 4, name: '公开日' },
    { id: 5, name: '授权日' },
    { id: 6, name: '法律状态' },
    { id: 7, name: '法律事件' },
    { id: 8, name: '分类号:大类' },
    { id: 9, name: '分类号:小类' },
    { id: 10, name: '分类号:大组' },
    { id: 11, name: '分类号:大组' },
    { id: 12, name: '外观分类' },
    { id: 13, name: '发明人' },
    { id: 14, name: '代理机构' },
    { id: 15, name: '代理人' },
  ]

  searchKeys: Array<any>
  searchFields: Array<any>

  lastParams: SF1SearchParams
  sf1: SF1Response

  pages: Array<any>
  pageCnt: number = 10

  viewMode: number = 1
  viewModeDesc: string[] = ['列表模式', '图文模式'] // ,'首图模式'

  sortMode: number = 0
  sortModeDesc: string[] = ['按相关度排序', '按公开日升序', '按公开日降序', '按申请日升序', '按申请日降序']

  exp: SF1SearchExp

  error: any

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: SF1Service,
    private sf1exp: SF1SearchExp
  ) {
    this.exp = sf1exp
    this.searchFields = this.exp.getFields()
  }

  ngOnInit() {
    this.route.data.subscribe((data: { crisis: SF1Response }) => {
      console.log(data.crisis)
      this.sf1 = data.crisis

      this.lastParams = this.service.lastParams

      this.clear()
      this.initPages()
    })
    this.route.params.subscribe(q => {
      const status = q.status
      const message = q.message
      if (status && status !== '0') {
        this.error = { status, message }
        setTimeout(() => { this.error = null }, 10000)
      }
    })
  }

  getDbName(code: string) {
    const db = this.service.getDatabase(code)
    if (db) {
      return db.name
    }
    return ''
  }

  setViewMode(mode: number) {
    this.viewMode = mode
  }

  setSortMode(mode: number) {
    this.sortMode = mode
  }

  clear() {
    this.searchKeys = []
    this.addField()
  }

  getDisplay() {
    return this.exp.buildSecondSearch(this.searchKeys)
  }


  doSearch() {
    const v = this.exp.buildSecondSearch(this.searchKeys)

    if (!v) {
      return
    }

    this.exp.addSecGroup(this.searchKeys)
    this.lastParams.exp = this.exp.Encode()
    this.lastParams.from = 0
    this.lastParams.to = this.pageCnt

    this.clear()
    this.service.redirectUrl = '/sf1/list'

    // Add a totally useless `t` parameter for kicks.
    // Relative navigation back to the /sf1/list
    this.router.navigate(['/sf1/list', { t: moment().valueOf() }],
      { queryParams: this.lastParams, relativeTo: this.route })
  }

  doPage(from: number) {
    this.lastParams.exp = this.exp.Encode()
    this.lastParams.from = from
    this.lastParams.to = from + this.pageCnt

    this.clear()
    this.service.redirectUrl = '/sf1/list'

    // Add a totally useless `t` parameter for kicks.
    // Relative navigation back to the /sf1/list
    this.router.navigate(['/sf1/list', { t: moment().valueOf() }],
      { queryParams: this.lastParams, relativeTo: this.route })
  }

  addField() {
    const f = {
      field: this.searchFields[0],
      op: 'AND',
      value: '',
    }

    this.searchKeys.push(f)
  }

  removeField(i: number) {
    this.searchKeys.splice(i, 1)
  }

  initPages() {
    this.pages = new Array<any>()

    let ps = Math.trunc((this.sf1.from) / this.pageCnt)

    if (ps < 1) {
      ps = 1
    }

    if ((ps%10)!==1){
      ps=Math.trunc(ps/10)*10+1
    }

    let pe = Math.trunc(this.sf1.total * 1.0 / this.pageCnt + 0.5)
    if (pe > ps + 9) {
      pe = ps + 9
    }

    for (let i = ps; i <= pe; i++) {
      const pitem = {
        id: i,
        from: (i - 1) * this.pageCnt,
      }

      this.pages.push(pitem)
    }

    console.log(this.pages)

  }

  delSecGroup(id) {
    this.exp.sec_group.splice(id - 1, 1)
    this.doPage(0)
  }

  setPageCnt(cnt) {
    if (this.pageCnt !== cnt) {
      this.pageCnt = cnt
      let f = Math.trunc(this.lastParams.from / cnt) * cnt
      this.doPage(f)
    }
  }

  doPrePage(){
    let f:number =this.lastParams.from - this.pageCnt 
    if (f>=0) {
      this.doPage(f)
    }
  }

  doNextPage(){
    let f:number = this.lastParams.from - 0 + this.pageCnt
    if (f<this.sf1.total) {
      this.doPage(f)
    }
  }

}
