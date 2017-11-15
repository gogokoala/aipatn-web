import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import * as moment from 'moment/moment'

import { SF1Response, SF1Service, SF1SearchParams } from './sf1.service'

@Injectable()
export class SF1ListResolver implements Resolve<SF1Response> {
  constructor(private sf1: SF1Service, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SF1Response> {
    const params: SF1SearchParams = { exp: '' }

    const exp = route.queryParamMap.get('exp')
    const dbs = route.queryParamMap.get('dbs')
    const from: any = route.queryParamMap.get('from')
    const to: any = route.queryParamMap.get('to')
    const order = route.queryParamMap.get('order')
    const option: any = route.queryParamMap.get('option')
    const displayCols = route.queryParamMap.get('displayCols')

    if (!exp) {
      this.router.navigate([this.sf1.redirectUrl])
      return null
    }

    params.exp = exp
    params.dbs = dbs ? dbs : 'FMZL,FMSQ,SYXX,WGZL'
    params.order = order ? order : ''
    params.displayCols = displayCols ? displayCols : ''
    params.option = option && !isNaN(option) ? option : 2
    params.from = from && !isNaN(from) ? from : 0
    params.to = to && !isNaN(to) ? to : 10

    return this.sf1.getList(params).map(res => {
      if (res && res.status === '0') {
        return res
      } else { // id not found
        this.router.navigate([this.sf1.redirectUrl, { t: moment().valueOf() }],  { queryParams: res })
        return null
      }
    })
  }
}
