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

  // filter_items: any[] = [
  //   { id: 1, name: '国家' },
  //   { id: 2, name: '申请人' },
  //   { id: 3, name: '申请日' },
  //   { id: 4, name: '公开日' },
  //   { id: 5, name: '授权日' },
  //   { id: 6, name: '法律状态' },
  //   { id: 7, name: '法律事件' },
  //   { id: 8, name: '分类号:大类' },
  //   { id: 9, name: '分类号:小类' },
  //   { id: 10, name: '分类号:大组' },
  //   { id: 11, name: '分类号:大组' },
  //   { id: 12, name: '外观分类' },
  //   { id: 13, name: '发明人' },
  //   { id: 14, name: '代理机构' },
  //   { id: 15, name: '代理人' },
  // ]

  filter_items: any[] = [
    { id: 0, name: '数据库', items: [] },
    { id: 1, name: '申请日', items: [] },
    { id: 2, name: '公开日', items: [] },
    { id: 3, name: '授权日', items: [] }
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
    this.error = null

    this.route.data.subscribe((data: { crisis: SF1Response }) => {
      console.log(data.crisis)

      this.sf1 = data.crisis

      this.lastParams = this.sf1.params;
      if (this.lastParams.jp) {
        this.exp.Decode(this.lastParams.jp)
      }

      this.clear()
      this.initPages()
      this.initFilter()
    })

    this.route.queryParams.subscribe(q => {
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

    this.lastParams.exp = this.exp.getValue()
    this.lastParams.dp = this.exp.getDisplayText()
    this.lastParams.jp = this.exp.Encode()

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
    this.lastParams.exp = this.exp.getValue()
    this.lastParams.dp = this.exp.getDisplayText()
    this.lastParams.jp = this.exp.Encode()
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

    if ((ps % 10) !== 1) {
      ps = Math.trunc(ps / 10) * 10 + 1
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

  doPrePage() {
    let f: number = this.lastParams.from - this.pageCnt
    if (f >= 0) {
      this.doPage(f)
    }
  }

  doNextPage() {
    let f: number = this.lastParams.from - 0 + this.pageCnt
    if (f < this.sf1.total) {
      this.doPage(f)
    }
  }

  private initDBFilter() {
    let dbs = []

    this.lastParams.dbs.split(',').forEach((db) => {
      let d = this.service.getDatabase(db)
      if (d) {
        let data = {
          code: db,
          name: d.name,
          cnt: -1,
          rate: 0
        }
        dbs.push(data)
      }
    })



    return dbs
  }

  private initYearFilter(field: string) {
    const n = 10
    let r = []
    let y = moment().year()

    for (let i = 0; i < n; i++) {
      let d = {
        name: y - i,
        code: field + '=(' + (y - i) + '0101 to ' + (y - i) + '1231)',
        cnt: -1,
        rate: 0
      }

      r.push(d)
    }

    let d = {
      name: (y - n).toString() + '及以前',
      code: field + '=(19700101 to ' + (y - 10) + '1231)',
      cnt: -1,
      rate: 0
    }

    r.push(d)

    return r
  }

  private getFilterCnt() {
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < this.filter_items[j].items.length; i++) {
        let ji = this.filter_items[j].items[i]

        if (ji.cnt < 0) {

          let p = Object.assign({}, this.lastParams)

          switch (j) {
            case 0:
              p.dbs = ji.code
              break
            case 1:
            case 2:
            case 3:
              p.exp = '(' + p.exp + ') AND ' + ji.code
              break
          }

          p.from = 0
          p.to = 1

          this.service.search(p).subscribe((d) => {
            console.log(d);
            if (d.status !== '0') {
              ji.cnt = 0
            } else if (d.results) {
              ji.cnt = d.total
              ji.rate = (d.total / this.sf1.total * 100).toFixed(1)
            }

            setTimeout(() => {
              this.getFilterCnt()
            }, 100);
          })

          return
        }

      }
    }

  }

  initFilter() {
    this.filter_items[0].items = this.initDBFilter()

    this.filter_items[1].items = this.initYearFilter('申请日')
    this.filter_items[2].items = this.initYearFilter('公开（公告）日')
    this.filter_items[3].items = this.initYearFilter('优先权日')

    this.getFilterCnt()

  }

}
