import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service'
import { SF1SearchExp } from '../sf1-search.service';
import { SF1Service, SF1SearchParams } from '../sf1.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-complex-search',
  templateUrl: './complex-search.component.html',
  styleUrls: ['./complex-search.component.css']
})


export class ComplexSearchComponent implements OnInit {

  result_num = 0
  error: any

  cn: any = {
    /** 每周第一天，0代表周日 */
    firstDayOfWeek: 0,
    /** 每周天数正常样式 */
    dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    /** 每周天数短样式（位置较小时显示） */
    dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    /** 每周天数最小样式 */
    dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
    /** 每月月份正常样式 */
    monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    /**每月月份短样式 */
    monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  }

  exp: SF1SearchExp

  flg: any = {
    doResultNum: false
  }

  key_group = [
    { id: 1, title: '所有字段' },
    { id: 2, title: '专利名称/摘要' },
    { id: 3, title: '专利名称/摘要/权利要求' },
    { id: 4, title: '专利名称' },
    { id: 5, title: '摘要' },
    { id: 6, title: '权利要求' },
    { id: 8, title: '说明书' },
  ]

  code_group = [
    { id: 1, title: '申请号' },
    { id: 2, title: '公开（公告）号' },
    { id: 3, title: '优先权号' },
  ]

  type_group = [
    { id: 1, title: '国际分类号（IPC）' },
    // { id: 2, name: [], title: '外观分类(Locarno)' },
  ]

  name_group = [
    { id: 1, title: '申请（专利权）人' },
    // { id: 2, name: [], title: '当前专利权人' },
    // { id: 3, name: [], title: '股票代码' },
    { id: 4, title: '发明人' },
    { id: 5, title: '代理人' },
    { id: 6, title: '代理机构' },
    { id: 8, title: '申请人地址' },
  ]

  date_group = [
    { id: 1, title: '申请日' },
    { id: 2, title: '公开（公告）日' },
    { id: 3, title: '授权日' },
  ]
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private user: UserService,
    private sf1: SF1Service,
    private sf1Exp: SF1SearchExp
  ) {
    this.exp = sf1Exp
  }

  ngOnInit() {
    this.error = null

    this.route.queryParams.subscribe(q => {
      console.log(q)
      const status = q.status
      const message = q.message
      if (status && status !== '0') {
        this.error = { status, message }
        setTimeout(() => { this.error = null }, 10000)
      }
    })

    this.exp.clearFilter()
    this.exp.resetID()

    this.exp.linkGroup(this.key_group)
    this.exp.linkGroup(this.code_group)
    this.exp.linkGroup(this.name_group)
    this.exp.linkGroup(this.type_group)
    this.exp.linkGroup(this.date_group)
  }

  private clearGroup(group){
    group.forEach((g)=>{
      g.items.splice(0,g.items.length)
      this.newItem(g)
    })
  }

  clear(){
    this.clearGroup(this.key_group) 
    this.clearGroup(this.code_group) 
    this.clearGroup(this.name_group) 
    this.clearGroup(this.type_group) 
    this.clearGroup(this.date_group) 
  }


  newItem(item) {
    let v=this.exp.emptyValue()
    item.items.push(v)
  }

  removeItemAt(item,index) {
    item.items.splice(index, 1)
  }

  private makeParams(cnt) {
    const exp = this.exp.getValue()
    // const dbs = this.exp.getDBValue()
    const dbs = 'FMZL,FMSQ,SYXX,WGZL'

    const order = ''
    const displayCols = ''
    const option = 2
    const from = 0
    const to = cnt
    const dp = this.exp.getDisplayText()
    const jp = this.exp.Encode()

    let p: SF1SearchParams = { exp, dbs, order, option, from, to, displayCols, dp, jp }

    return p

  }

  doSearch() {
    //const k = this.exp.getKeyWords()
    //console.log(k)

    let p = this.makeParams(10)

    this.sf1.redirectUrl = '/sf1/complex'
    this.router.navigate(['/sf1/list'], { queryParams: p });
  }

  doResultNum() {
    this.result_num = 0
    this.error = null
    this.flg.doResultNum = true

    let p = this.makeParams(1)

    this.sf1.search(p).subscribe((d) => {
      this.flg.doResultNum = false
      console.log(d);
      if (d.status !== '0') {
        this.error = {
          status: d.status,
          Message: d.message
        }
        setTimeout(() => { this.error = null }, 10000)
      }
      else if (d.results) {
        this.result_num = d.total
      }
    })
  }

}
