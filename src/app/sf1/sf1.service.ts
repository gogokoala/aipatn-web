import { Injectable } from '@angular/core'
import { Headers, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import { SF1SearchExp } from './sf1-search.service';

/**
 * 专利摘要数据
 */
export interface SF1Data {
  pid: string
  sysid: string
  appNumber: string
  pubNumber: string
  appDate: string
  pubDate: string
  title: string
  ipc: Array<string>
  applicantName: Array<string>
  inventroName: Array<string>
  priority: string
  agencyName: Array<string>
  agentName: string
  addrProvince: string
  addrCity: string
  addrCounty: string
  address: string
  patType: string
  iapp: string
  ipub: string
  den: string
  abs: string
  lprs: string
  dbName: string
  tifDistributePath: string
  pages: string
  relevance: string
  proCode: string
  appCoun: string
  gazettePath: string
  gazettePage: string
  gazetteCount: string
  statusCode: string
  familyNo: string
}

/**
 * 数据库及满足条件的数据条数
 */
export interface SF1SectionInfo {
  sectionName: string
  recordNum: number
}

/**
 * sf1 摘要检索响应结构
 */
export interface SF1Response {
  status: string
  message: string
  total: number
  from: number
  to: number
  results: Array<SF1Data>
  sectionInfos: Array<SF1SectionInfo>
  t?:number
}

/**
 * 专利数据库分组
 */
export interface PatentGroup {
  code: string
  name: string
}

/**
 * 专利数据库
 */
export interface PatentDatabase {
  code: string
  name: string
  group: string
}

export interface SF1SearchParams {
  exp: string
  dbs?: string
  order?: string
  option?: number
  from?: number
  to?: number
  displayCols?: string
  dp?: string   //exp.getDisplay()
  jp?: string   //exp.Encode()
}

@Injectable()
export class SF1Service {

  private headers = new Headers({ 'Content-Type': 'application/json' })
  // private baseUrl = 'http://www.aipatn.com/api/'
  private baseUrl = 'http://47.100.5.243/api/'

  private dbGroups: Array<PatentGroup> = [
    { name: '中国', code: 'CN' },
    { name: '主要国家和组织', code: 'MAIN' },
    { name: '其它国家和地区', code: 'OTHERS' },
  ]

  private dbNames: Array<PatentDatabase> = [
    { code: 'FMZL', name: '中国发明专利', group: 'CN' },
    { code: 'FMSQ', name: '中国发明授权', group: 'CN' },
    { code: 'SYXX', name: '中国实用新型', group: 'CN' },
    { code: 'WGZL', name: '中国外观专利', group: 'CN' },
    { code: 'TWZL', name: '台湾', group: 'CN' },
    { code: 'HKPATENT', name: '香港', group: 'CN' },

    { code: 'USPATENT', name: '美国', group: 'MAIN' },
    { code: 'GBPATENT', name: '英国', group: 'MAIN' },
    { code: 'FRPATENT', name: '法国', group: 'MAIN' },
    { code: 'DEPATENT', name: '德国', group: 'MAIN' },
    { code: 'CHPATENT', name: '瑞士', group: 'MAIN' },
    { code: 'JPPATENT', name: '日本', group: 'MAIN' },
    { code: 'RUPATENT', name: '俄罗斯', group: 'MAIN' },
    { code: 'KRPATENT', name: '韩国', group: 'MAIN' },
    { code: 'EPPATENT', name: '欧洲专利局(EPO)', group: 'MAIN' },
    { code: 'WOPATENT', name: '世界知识产权组织(WIPO)', group: 'MAIN' },

    { code: 'GCPATENT', name: '阿拉伯', group: 'OTHERS' },
    { code: 'AUPATENT', name: '澳大利亚', group: 'OTHERS' },
    { code: 'CAPATENT', name: '加拿大', group: 'OTHERS' },
    { code: 'ESPATENT', name: '西班牙', group: 'OTHERS' },
    { code: 'ATPATENT', name: '奥地利', group: 'OTHERS' },
    { code: 'ITPATENT', name: '意大利', group: 'OTHERS' },
    { code: 'APPATENT', name: '非洲地址', group: 'OTHERS' },
    { code: 'SEPATENT', name: '瑞典', group: 'OTHERS' },
    { code: 'ASPATENT', name: '东南亚', group: 'OTHERS' },
    { code: 'OTHERPATENT', name: '更多其它国家', group: 'OTHERS' },
  ]

  lastParams: SF1SearchParams
  redirectUrl: string

  constructor(private http: Http) {
    this.redirectUrl = ''
  }

  /**
   *
   * @param searchConditions (string) 查询条件
   */
  getList(params: SF1SearchParams): Observable<SF1Response> {

    this.lastParams = Object.assign({}, params)

    return this.http.post(
      `${this.baseUrl}sf1`,
      JSON.stringify(params),
      { headers: this.headers }
    ).map(response => {
      const res = response.json()
      console.log(res)
      if (res.code === 0 && res.data) {
        return res.data as SF1Response
      }

      return res.error as SF1Response
    })
  }

  /**
   * 根据数据库代表，查找对应数据库名称
   * @param code 数据库代码
   */
  getDatabase(code: string) {
    let el: PatentDatabase
    for (let i = 0; i < this.dbNames.length; i++) {
      el = this.dbNames[i]
      if (code === el.code) {
        return el
      }
    }

    return undefined
  }

  /**
   * 格式化文本，突出显示关键字
   * @param s 文本
   * @param keywords 关键字数组
   */
  formatString(s: string, keywords: Array<string>): string {
    if (s && keywords) {
    }

    return ''
  }
}

