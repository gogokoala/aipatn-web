import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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

  flg:any={
    doResultNum:false
  }

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
    this.error=null
    this.exp.clearSecGroup()

    this.route.params.subscribe(q => {
      console.log(q)
      const status = q.status
      const message = q.message
      if (status && status !== '0') {
        this.error = { status, message }
        setTimeout(() => { this.error = null }, 10000)
      }
    })

    // this.error = {
    //   status: '401',
    //   message: '检索结果为空'
    // }
    // setTimeout(() => { this.error = null }, 10000)

   
  }

  private makeParams(cnt){
    const exp = this.exp.getValue()
    // const dbs = this.exp.getDBValue()
    const dbs = 'FMZL,FMSQ,SYXX,WGZL'

    const order = ''
    const displayCols = ''
    const option = 2
    const from = 0
    const to = cnt
    const dp=this.exp.getDisplayText()
    const jp=this.exp.Encode()

    let p:SF1SearchParams={ exp, dbs, order, option, from, to, displayCols, dp, jp }

    return p

  }

  doSearch() {
    //const k = this.exp.getKeyWords()
    //console.log(k)

    let p=this.makeParams(10)
    
    this.sf1.redirectUrl = '/sf1/complex'
    this.router.navigate(['/sf1/list'], { queryParams: p });
  }

  doResultNum(){
    this.result_num=0
    this.error=null
    this.flg.doResultNum=true

    let p=this.makeParams(0)    
    this.sf1.redirectUrl = '/sf1/complex'
    this.sf1.getList(p).subscribe((d)=>{
      this.flg.doResultNum=false
      console.log(d);
      if (d.status!=='0')
      {
        this.error={
          status:d.status,
          Message:d.message
        }
        setTimeout(() => { this.error = null }, 10000)
      }
      else if (d.results){
        this.result_num=d.total
      }
    })
  }

}
