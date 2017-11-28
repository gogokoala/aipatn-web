import { Injectable } from '@angular/core'
import { Headers, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import { SF1SearchExp } from './sf1-search.service';

/**
 * 专利摘要数据
 */
export interface Patent {
  // sf1
  // 专利信息ID
  pid: string
  // sysid
  sysid: string
  // 申请号
  appNumber: string
  // 公开（公告）号'
  pubNumber: string
  // 申请日'
  appDate: string
  // 公开（公告）日'
  pubDate: string
  // 名称'
  title: string
  // 分类号'
  ipc: string[]
  // 申请（专利权）人'
  applicantName: string[]
  // 发明（设计）人'
  inventroName: string[]
  // 优先权'
  priority: string[]
  // 专利代理机构'
  agencyName: string
  // 代理人'
  agentName: string
  // 省'
  addrProvince: string
  // 市'
  addrCity: string
  // 县'
  addrCounty: string
  // 地址'
  address: string
  // 专利类型'
  patType: number
  // 国际申请'
  iapp: string
  // 国际公布'
  ipub: string
  // 进入国家日期'
  den: string
  // 摘要'
  abs: string
  // 最新法律状态'
  lprs: string
  // 摘要附图存储路径'
  draws: string
  // 专利所属库名'
  dbName: string
  // 发布路径'
  tifDistributePath: string
  // 页数'
  pages: number
  // 相似度'
  relevance: string
  // 国省代码'
  proCode: string
  // 申请国代码'
  appCoun: string
  // 公报发布路径'
  gazettePath: string
  // 公报所在页'
  gazettePage: number
  // 公报翻页信息'
  gazetteCount: number
  // 专利状态码'
  statusCode: string
  // 法律状态'
  legalStatus: string
  // 主分类号'
  mainIpc: string
  // 国家资源'
  appResource: string
  // 同族号'
  familyNo: string
  // 主权项'
  cl: string
  // 关键词'
  patentWords: string

  // sf2
  // 自动摘要'
  autoAbs: string
  // 权利要求书'
  claimsPath: string
  //
  cipPath: string
  // 说明书'
  instrPath: string
  // 说明书附图'
  instrTif: string
  // 审查员'
  censor: string
  // 参考文献'
  refDoc: string
  // 优先权日'
  priorityDate: string
  // 颁证日'
  issueDate: string
  // 本国主分类号'
  initMainIpc: string
  // 本国分类号'
  initIpc: string
  // 分案原申请号'
  divideInitAppNo: string
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
  results: Array<Patent>
  sectionInfos: Array<SF1SectionInfo>
  t?: number
  params?: SF1SearchParams
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
  dp?: string   // exp.getDisplay()
  jp?: string   // exp.Encode()
}

@Injectable()
export class SF1Service {

  private headers = new Headers({ 'Content-Type': 'application/json' })
  // private baseUrl = 'http://www.aipatn.com/api/'
  private baseUrl = 'http://47.100.5.243/api/'
  // private baseUrl = 'http://192.168.0.216/api/'

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

  // 最后一次检索条件
  lastParams: SF1SearchParams
  // 检索失败时的重定向地址
  redirectUrl: string
  // 无法重定向时，使用默认重定向
  defaultSearchRedirectUrl = '/sf1/simple'


  constructor(private http: Http) {
    this.redirectUrl = ''
  }

  /**
   *
   * @param searchConditions (string) 查询条件
   */
  search(params: SF1SearchParams): Observable<SF1Response> {
    return this.http.post(
      `${this.baseUrl}sf1`,
      JSON.stringify(params),
      { headers: this.headers }
    ).map(response => {
      const res = response.json()
      // console.log(res)
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
   * 转义正则特殊字符 （$()*+.[]?\^{},|）
   *
   * @param keyword
   * @return
   */
  escapeExprSpecialWord(keyword: string) {
    if (keyword) {
      const fbsArr: string[] = ['\\', '$', '(', ')', '*', '+', '.', '[', ']', '?', '^', '{', '}', '|' ]
      fbsArr.forEach(key => {
        if (keyword.indexOf(key) >= 0) {
          keyword = keyword.replace(key, '')
        }
      })
    }

    return keyword
  }

  /**
   * 格式化文本，突出显示关键字
   * @param s 文本
   * @param keywords 关键字数组
   */
  formatString(s: any, keywords: Array<string>): string {
    if (s && keywords) {
      let text: string = s.toString()
      keywords.forEach(word => {
        const w = this.escapeExprSpecialWord(word)
        text = text.replace(w, '<span class="m-highlight">' + w + '</span>')
      })
      return text
    }

    return ''
  }
}

