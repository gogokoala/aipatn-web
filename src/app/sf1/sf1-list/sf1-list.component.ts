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

  searchKeys:Array<any>
  searchFields:Array<any>

  lastParams: SF1SearchParams
  sf1: SF1Response

  viewMode: number
  viewModeDesc: string[] = ['列表模式', '图文模式'] // ,'首图模式'

  sortMode: number
  sortModeDesc: string[] = ['按相关度排序', '按公开日升序', '按公开日降序', '按申请日升序', '按申请日降序']

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SF1Service,
    private exp: SF1SearchExp
  ) {
    this.lastParams = service.lastParams
    this.searchFields = this.exp.getFields()
    this.searchKeys=[]
    this.addField()
    
  }

  ngOnInit() {
    this.route.data.subscribe((data: { crisis: SF1Response }) => {
      console.log(data.crisis)
      this.sf1 = data.crisis

      this.viewMode = 1;
      this.sortMode = 0;
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

  getExpValue() {
    const l = this.lastParams.exp
    const v = this.exp.buildSecondSearch(this.searchKeys)
    return l+v
  }

  clear(){
    this.searchKeys=[]
    this.addField()
  }


  doSearch() {
    let v=this.exp.buildSecondSearch(this.searchKeys)

    if (!v) {
      return
    }

    this.lastParams.exp = this.getExpValue()

    this.clear()

    console.log('doSearch(): ' + this.lastParams)

    // Add a totally useless `t` parameter for kicks.
    // Relative navigation back to the /sf1/list
    this.router.navigate(['/sf1/list', { t: moment().valueOf() }],
      { queryParams: this.lastParams, relativeTo: this.route })
  }

  addField(){
    let f={
      field: this.searchFields[0],
      op:'AND',
      value:'',
    }

    this.searchKeys.push(f)
  }

  removeField(i:number){
    this.searchKeys.splice(i,1)
  }

}
