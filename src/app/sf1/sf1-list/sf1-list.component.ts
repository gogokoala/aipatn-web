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
    // { id: 3, name: '授权日', items: [] }
  ]

  filterParam: any

  secKey: any
  searchFields: Array<any>

  lastParams: SF1SearchParams
  sf1: SF1Response

  pages: Array<any>
  pageCnt = 10

  viewMode = 1
  viewModeDesc: string[] = ['列表模式', '图文模式'] // ,'首图模式'

  sortMode = 0
  sortModeDesc: string[] = ['按相关度排序', '按公开日升序', '按公开日降序', '按申请日升序', '按申请日降序']

  exp: SF1SearchExp

  error: any

  private currentKeywords: string[]

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

      const sf1Res = data.crisis

      if (sf1Res.status && sf1Res.status !== '0') {
        this.error = { status: sf1Res.status, message: sf1Res.message }
        setTimeout(() => { this.error = null }, 30000)
        return
      }

      this.sf1 = sf1Res

      if (this.service.lastParams) {
        this.lastParams = this.service.lastParams;

        if (this.lastParams.jp) {
          this.exp.Decode(this.lastParams.jp)
        }

        this.exp.newLevel()
        this.clear()
        this.initPages()
        this.initFilter()

        // 供文本高亮使用
        this.currentKeywords = this.exp.getKeyWords()
      }
    })

    this.route.queryParams.subscribe(q => {
      const status = q.status
      const message = q.message
      if (status && status !== '0') {
        this.error = { status, message }
        setTimeout(() => { this.error = null }, 30000)
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
    this.secKey = {
      field: '所有字段',
      op: 'AND',
      value: ''
    }
  }

  addField() {
    const v = Object.assign({}, this.secKey)

    if (v.value) {
      this.exp.addValue(v)
      this.secKey.value = ''
    }
  }

  getDBS() {
    let r = ''
    this.filter_items[0].items.forEach((db) => {
      if (db.checked) {
        if (r) {
          r += ','
        }
        r += db.code
      }
    })
    return r
  }

  doSearch() {
    this.filterParam = null

    this.lastParams.exp = this.exp.getValue()
    this.lastParams.dp = this.exp.getDisplayText()
    this.lastParams.jp = this.exp.Encode()

    this.lastParams.from = 0
    this.lastParams.to = this.pageCnt

    const dbs = this.getDBS()
    if (dbs) {
      this.lastParams.dbs = dbs
    }


    console.log(this.lastParams)

    this.service.redirectUrl = null

    // Add a totally useless `t` parameter for kicks.
    // Relative navigation back to the /sf1/list
    this.router.navigate(['/sf1/list', { t: moment().valueOf() }],
      { queryParams: this.lastParams })
  }

  doPage(from: number) {
    this.filterParam = null

    this.lastParams.exp = this.exp.getValue()
    this.lastParams.dp = this.exp.getDisplayText()
    this.lastParams.jp = this.exp.Encode()
    this.lastParams.from = from
    this.lastParams.to = from + this.pageCnt

    this.service.redirectUrl = '/sf1/list'

    // Add a totally useless `t` parameter for kicks.
    // Relative navigation back to the /sf1/list
    this.router.navigate(['/sf1/list', { t: moment().valueOf() }],
      { queryParams: this.lastParams, relativeTo: this.route })
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

  setPageCnt(cnt) {
    if (this.pageCnt !== cnt) {
      this.pageCnt = cnt
      const f = Math.trunc(this.lastParams.from / cnt) * cnt
      this.doPage(f)
    }
  }

  doPrePage() {
    const f: number = this.lastParams.from - this.pageCnt
    if (f >= 0) {
      this.doPage(f)
    }
  }

  doNextPage() {
    const f: number = this.lastParams.from - 0 + this.pageCnt
    if (f < this.sf1.total) {
      this.doPage(f)
    }
  }

  private initDBFilter() {
    const dbs = []

    this.sf1.sectionInfos.forEach((db) => {
      const d = this.service.getDatabase(db.sectionName)

      if (d) {
        const data = {
          code: db.sectionName,
          name: d.name,
          cnt: db.recordNum,
          rate: (db.recordNum / this.sf1.total * 100.0).toFixed(1),
          checked: true,
          mode: 9,
          vid: 0
        }
        dbs.push(data)
      }
    })

    return dbs
  }

  private initYearFilter(field: string) {
    const n = 10
    const r = []
    const y = moment().year()

    for (let i = 0; i < n; i++) {
      const d = {
        name: y - i,
        code: field + '=(' + (y - i) + '0101 to ' + (y - i) + '1231)',
        cnt: -1,
        rate: 0,
        mode: 1,
        vid: 0,
        exp: {
          field: field,
          op: 'OR',
          value: '',
          mode: 0,
          from: new Date(y - i, 0, 1),
          to: new Date(y - i, 11, 31)
        }
      }

      r.push(d)
    }

    const d = {
      name: (y - n).toString() + '及以前',
      code: field + '=(19700101 to ' + (y - n) + '1231)',
      cnt: -1,
      rate: 0,
      mode: 1,
      vid: 0,
      exp: {
        field: field,
        value: '',
        mode: 0,
        from: new Date(1970, 0, 1),
        to: new Date(y - n, 11, 31)
      }
    }

    r.push(d)

    return r
  }

  private getFilterCnt() {
    if (!this.filterParam) {
      return
    }

    for (let j = 1; j < this.filter_items.length; j++) {
      for (let i = 0; i < this.filter_items[j].items.length; i++) {
        const ji = this.filter_items[j].items[i]

        if (ji.cnt < 0) {

          const p = Object.assign({}, this.filterParam)

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
            if (d.status !== '0') {
              console.log(d);
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
    // this.filter_items[3].items = this.initYearFilter('优先权日')

    this.filterParam = Object.assign({}, this.lastParams)

    this.getFilterCnt()
  }

  addFilter(ti) {
    switch (ti.mode) {
      case 1:
        if (ti.vid > 0 && this.exp.findValue(ti.vid)) {
          this.exp.removeValue(ti.vid)
          ti.vid = 0
        } else {
          const v = this.exp.addValue(ti.exp)
          ti.vid = v.id
        }
        break
      case 9:
        ti.checked = false
        break
    }
  }


  highLightText(s: string): string {
    return this.service.formatString(s, this.currentKeywords)
  }

}
