import * as moment from 'moment'
import { forEach } from '@angular/router/src/utils/collection'
import * as crypt from 'crypt'

class SF1SearchConditionItem {
  op: string
  value: string
  mode: string
  from: Date
  to: Date

  constructor() {
    this.op = 'AND'
    this.value = ''
    this.mode = '0'
    this.from = null
    this.to = null
  }
}

class SF1SearchCondition {
  id: number
  name: Array<string>
  title: string
  items = Array<SF1SearchConditionItem>()

  constructor(id: number, name: Array<string>, title: string) {
    this.id = id
    this.name = name
    this.title = title

    this.newItem()
  }

  newItem() {
    const v = new SF1SearchConditionItem()
    this.items.push(v)
  }

  removeItemAt(index) {
    this.items.splice(index, 1)
  }

  getValue() {
    let v = ''
    let p=''

    for (let i = 0; i < this.items.length; i++) {
      const it = this.items[i]
      if (it.value.trim() !== '') {
        if (v !== '') {
          v += (' ' + it.op + ' ')
        }
        else {
          p=it.op
        }
        v += it.value
      }
    }

    if (v === '') {
      return ''
    }

    let r = ''

    for (let i = 0; i < this.name.length; i++) {
      if (i > 0) {
        r += ' or '
      }
      r += (this.name[i] + '=(' + v + ')')
    }

    if (r !== '') {
      r = (p +' (' + r + ')')
    }

    return r
  }

  getDateValue() {
    let v = ''
    let p =''

    for (let i = 0; i < this.items.length; i++) {
      const it = this.items[i]
      let f = it.from
      let t = it.to

      let fs = ''
      let ts = ''

      switch (it.mode) {
        case '1':
          if (t !== null) {
            f = new Date('1970-01-01')
          }
          break
        case '2':
          if (f !== null) {
            t = new Date()
          }
          break
        case '3':
          if (f !== null) {
            t = f
          }
          break
      }

      if (f !== null && t !== null) {
        fs = moment(f).format('YYYYMMDD')
        ts = moment(t).format('YYYYMMDD')

        let r = ''

        for (let j = 0; j < this.name.length; j++) {
          if (r !== '') {
            r += ' OR '
          }
          r += (this.name[j] + '=(' + fs + ' to ' + ts + ')')
        }

        if (r !== '') {
          if (v !== '') {
            v += (' ' + it.op + ' ')
          }
          else{
            p=it.op
          }
          v += r
        }
      }
    }

    if (v !== '') {
      v = (p+' (' + v + ')')
    }
    return v
  }
}

export class SF1SearchExp {
  key_group: Array<SF1SearchCondition>
  code_group: Array<SF1SearchCondition>
  type_group: Array<SF1SearchCondition>
  name_group: Array<SF1SearchCondition>
  date_group: Array<SF1SearchCondition>

  sec_group: Array<Array<SF1SearchCondition>>

  lastKeyWord: string

  db_group: any[] = [
    { id: 0, name: '全部数据', sub_types: [] },
    {
      id: 1, name: '中国', sub_types: [
        { id: 1, code: 'FMZL', name: '中国发明专利' },
        { id: 2, code: 'FMSQ', name: '中国发明授权' },
        { id: 3, code: 'SYXX', name: '中国实用新型' },
        { id: 4, code: 'WGZL', name: '中国外观专利' },
        { id: 5, code: 'TWZL', name: '台湾' },
        { id: 6, code: 'HKPATENT', name: '香港' },
      ]
    },
    {
      id: 2, name: '主要国家和组织', sub_types: [
        { id: 1, code: 'USPATENT', name: '美国' },
        { id: 2, code: 'GBPATENT', name: '英国' },
        { id: 3, code: 'FRPATENT', name: '法国' },
        { id: 4, code: 'DEPATENT', name: '德国' },
        { id: 5, code: 'CHPATENT', name: '瑞士' },
        { id: 6, code: 'JPPATENT', name: '日本' },
        { id: 7, code: 'RUPATENT', name: '俄罗斯' },
        { id: 8, code: 'KRPATENT', name: '韩国' },
        { id: 9, code: 'EPPATENT', name: '欧洲专利局(EPO)' },
        { id: 10, code: 'WOPATENT', name: '世界知识产权组织(WIPO)' },
      ]
    },
    {
      id: 3, name: '其它国家和地区', sub_types: [
        { id: 1, code: 'GCPATENT', name: '阿拉伯' },
        { id: 2, code: 'AUPATENT', name: '澳大利亚' },
        { id: 3, code: 'CAPATENT', name: '加拿大' },
        { id: 4, code: 'ESPATENT', name: '西班牙' },
        { id: 5, code: 'ATPATENT', name: '奥地利' },
        { id: 6, code: 'ITPATENT', name: '意大利' },
        { id: 7, code: 'APPATENT', name: '非洲地址' },
        { id: 8, code: 'SEPATENT', name: '瑞典' },
        { id: 9, code: 'ASPATENT', name: '东南亚' },
        { id: 10, code: 'OTHERPATENT', name: '更多其它国家' },
      ]
    },
  ]

  constructor() {
    this.clear()
  }

  private initGroup(data: any[], group: Array<SF1SearchCondition>) {
    for (let i = 0; i < data.length; i++) {
      const cond = new SF1SearchCondition(data[i].id, data[i].name, data[i].title)
      group.push(cond)
    }
  }

  clear() {
    this.lastKeyWord = ''

    this.db_group[0].checked = true
    this.dbCheckAll(true)

    this.key_group = Array<SF1SearchCondition>()
    this.code_group = Array<SF1SearchCondition>()
    this.type_group = Array<SF1SearchCondition>()
    this.name_group = Array<SF1SearchCondition>()
    this.date_group = Array<SF1SearchCondition>()
    this.sec_group = Array<Array<SF1SearchCondition>>()

    const k: any[] = [
      { id: 1, name: ['名称', '摘要', '权利要求书', '说明书'], title: '所有字段' },
      { id: 2, name: ['名称', '摘要'], title: '专利名称/摘要' },
      { id: 3, name: ['名称', '摘要', '权利要求书'], title: '专利名称/摘要/权利要求' },
      { id: 4, name: ['名称'], title: '专利名称' },
      { id: 5, name: ['摘要'], title: '摘要' },
      { id: 6, name: ['权利要求书'], title: '权利要求' },
      { id: 8, name: ['说明书'], title: '说明书' },
    ]
    this.initGroup(k, this.key_group)

    const c: any[] = [
      { id: 1, name: ['申请号'], title: '申请号' },
      { id: 2, name: ['公开（公告）号'], title: '公开（公告）号' },
      { id: 3, name: ['优先权'], title: '优先权号' },
    ]
    this.initGroup(c, this.code_group)

    const t: any[] = [
      { id: 1, name: ['分类号'], title: '国际分类号（IPC）' },
      // { id: 2, name: [], title: '外观分类(Locarno)' },
    ]
    this.initGroup(t, this.type_group)

    const n: any[] = [
      { id: 1, name: ['申请（专利权）人'], title: '申请（专利权）人' },
      // { id: 2, name: [], title: '当前专利权人' },
      // { id: 3, name: [], title: '股票代码' },
      { id: 4, name: ['发明（设计）人'], title: '发明人' },
      { id: 5, name: ['代理人'], title: '代理人' },
      { id: 6, name: ['专利代理机构'], title: '代理机构' },
      { id: 8, name: ['地址'], title: '申请人地址' },
    ]
    this.initGroup(n, this.name_group)

    const d: any[] = [
      { id: 1, name: ['申请日'], title: '申请日' },
      { id: 2, name: ['公开（公告）日'], title: '公开（公告）日' },
      { id: 3, name: ['优先权日'], title: '授权日' },
    ]
    this.initGroup(d, this.date_group)
  }

  clearSecGroup(){
    this.sec_group=Array<Array<SF1SearchCondition>>()
  }

  buildKeySearch(text: string) {
    this.clear()
    this.lastKeyWord = text
    this.key_group[0].items[0].value = text
    return this.getValue()
  }

  buildCodeSearch(text: string) {
    this.clear()
    this.lastKeyWord = text
    this.type_group[0].items[0].value = text
    return this.getValue()
  }

  private getValueByGroup(group: Array<SF1SearchCondition>) {
    if (group == null) {
      return ''
    }
    let v = ''
    for (let i = 0; i < group.length; i++) {
      const r = group[i].getValue()
      if (r !== '') {
        if (v !== '') {
          v += ' '
        }
        v += r
      }
    }

    return v
  }

  private getDateValueByGroup(group: Array<SF1SearchCondition>) {
    if (group == null) {
      return ''
    }

    let v = ''

    for (let i = 0; i < group.length; i++) {
      const r = group[i].getDateValue()
      if (r !== '') {
        if (v !== '') {
          v += ' '
        }
        v += r
      }
    }

    return v
  }

  getValue() {
    // let j=JSON.stringify(this.date_group)

    const k = this.getValueByGroup(this.key_group)
    const c = this.getValueByGroup(this.code_group)
    const t = this.getValueByGroup(this.type_group)
    const n = this.getValueByGroup(this.name_group)
    const d = this.getDateValueByGroup(this.date_group)

    let s=''
    this.sec_group.forEach((g)=>{
      let gs=this.getValueByGroup(g)
      if (gs){
        s+=(' '+gs)
      }
    })

    let v = k

    if (c !== '' && v !== '') {
      v += ' '
    }
    v += c

    if (t !== '' && v !== '') {
      v += ' '
    }
    v += t

    if (n !== '' && v !== '') {
      v += ' '
    }
    v += n

    if (d !== '' && v !== '') {
      v += ' '
    }
    v += d

    if (s !='' && v!=''){
      v+=' '
    }
    v+=s

    if (v.startsWith('AND') || v.startsWith('NOT')){
      return v.substr(4,v.length-4)
    }
    else if (v.startsWith('OR')){
      return v.substr(3,v.length-3)
    }

    return v
  }

  dbCheckAll(bl: boolean) {
    this.db_group.forEach((g) => {
      g.checked = bl
      g.sub_types.forEach((t) => {
        t.checked = bl
      })
    })
  }

  onDBGroupChange(g) {
    if (g.id === 0) {
      this.dbCheckAll(g.checked)
    } else {
      this.db_group[0].checked = false
      g.sub_types.forEach((v) => {
        v.checked = g.checked
      })
    }
  }

  onDBSubChange(g, t) {
    g.checked = false
    this.db_group[0].checked = false
  }

  getDBValue() {
    // let j=JSON.stringify(this.db_group[0])

    let r = ''

    this.db_group.forEach((g) => {
      g.sub_types.forEach((t) => {
        if (t.checked) {
          r += ((r === '') ? '' : ',')
          r += t.code
        }
      })
    })

    return r
  }

  private getKeyWordsFromGroup(group: Array<SF1SearchCondition>, s: Array<string>) {
    group.forEach((v) => {
      v.items.forEach((w) => {
        if ((w.value === '') || (w.op === 'NOT')) {
          return
        }
        const i = s.indexOf(w.value)
        if (i < 0) {
          s.push(w.value)
        }
      })

    })
  }

  getKeyWords() {
    const s = Array<string>()

    this.getKeyWordsFromGroup(this.key_group, s)
    this.getKeyWordsFromGroup(this.code_group, s)
    this.getKeyWordsFromGroup(this.type_group, s)
    this.getKeyWordsFromGroup(this.name_group, s)

    return s
  }

  getFields(){
    let g=new Array<any>()
    let id=1

    this.key_group.forEach((item)=>{
      g.push({id:id, name:item.name, title:item.title})
      id++
    })

    this.code_group.forEach((item)=>{
      g.push({id:id, name:item.name, title:item.title})
      id++
    })

    this.type_group.forEach((item)=>{
      g.push({id:id,name:item.name, title:item.title})
      id++
    })

    this.name_group.forEach((item)=>{
      g.push({id:id,name:item.name, title:item.title})
      id++
    })

    return g
  }

  buildSecondSearch(keys:Array<any>){
    let g=new Array<SF1SearchCondition>()
    let id=1

    keys.forEach((k)=>{
      if (k.value){
        let f=new SF1SearchCondition(id,k.field.name,k.field.title)
        f.items[0].op=k.op
        f.items[0].value=k.value
        g.push(f)
        id++
      }
    })

    return this.getGroupDisplay(g).join(' ')
  }

  addSecGroup(keys: Array<any>) {
    let g = new Array<SF1SearchCondition>()
    let id = 1

    keys.forEach((k) => {
      if (k.value) {
        let f = new SF1SearchCondition(id, k.field.name, k.field.title)
        f.items[0].op = k.op
        f.items[0].value = k.value
        g.push(f)
        id++
      }
    })

    if (g.length>0){
      this.sec_group.push(g)
    }

  }


  private getGroupJson(g:Array<SF1SearchCondition>){
    let r=[]
    g.forEach((gi)=>{
      gi.items.forEach((v)=>{
        if (v.value || v.from || v.to){
          r.push({
            title:gi.title,
            value:v
          })
        }
      })
    })
    return r
  }

  private getDBJson(){
    let r=0xFFFFFFFF
    let f=0x00000001

    this.db_group.forEach((d)=>{
      d.sub_types.forEach((t)=>{
        if (!t.checked){
          r= (r & ~f)
        }
        f=(f<<1)
      })
    })

    return r
  }

  private getJson(){
    let d={
      key_group: this.getGroupJson(this.key_group),
      code_group: this.getGroupJson(this.code_group),
      type_group: this.getGroupJson(this.type_group),
      name_group: this.getGroupJson(this.name_group),
      date_group: this.getGroupJson(this.date_group),
      db_group:this.getDBJson(),
      sec_group: this.sec_group
    }

    return JSON.stringify(d)
  }

  Encode(){
    const j=this.getJson()
    const b = []
    
    for (let i = 0; i < j.length; ++i)
    {
        let c= j.charCodeAt(i)

        if (c<128){
          b.push(c)
        }
        else if(c<2048){
          b.push((c >> 6) | 192)
          b.push((c & 63) | 128)
        }
        else{
          b.push((c >> 12) | 224)
          b.push(((c >> 6) & 63) | 128)
          b.push((c & 63) | 128)
        }
    }
    const v =crypt.bytesToBase64(b)

    return v
  }

  private setDBJson(j){
    let f=0x00000001

    this.dbCheckAll(true)

    this.db_group.forEach((d)=>{
      d.sub_types.forEach((t)=>{
        let r=(f & j)
        if (r===0){
          t.checked=false
          d.checked=false
          this.db_group[0].checked=false
        }
        f=(f << 1)

      })
    })

  }

  private setJson(j){
    this.clear()
    let d=JSON.parse(j)

    this.sec_group=new Array<Array<SF1SearchCondition>>()
    
    d.sec_group.forEach((g)=>{
      this.sec_group.push(this.setGroup(g))
    })

    this.setDBJson(d.db_group)

    this.setGroupJson(this.key_group,d.key_group)
    this.setGroupJson(this.code_group,d.code_group)
    this.setGroupJson(this.type_group,d.type_group)
    this.setGroupJson(this.name_group,d.name_group)
    this.setGroupJson(this.date_group,d.date_group)
  }

  Decode(v:string){
    let b=crypt.base64ToBytes(v)
    let j=''
    let i=0
    while (i < b.length) {
      let c = b[i]
      if (c < 128) {
        j += String.fromCharCode(c)
        i++
      }
      else if ((c > 191) && (c < 224)) {
        let c2 = b[i + 1];
        j += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
        i += 2
      }
      else {
        let c2 = b[i + 1]
        let c3 = b[i + 2]
        j += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
        i += 3
      }
    }
    
    this.setJson(j)
  }

  private setGroup(j:Array<any>){
    let g=new Array<SF1SearchCondition>()

    j.forEach((item)=>{
      let i=new SF1SearchCondition(item.id,item.name,item.title)
      i.items=item.items
      g.push(i)
    })

    return g
  }

  private setGroupJson(g:Array<SF1SearchCondition>,j:Array<any>){
      g.forEach((gi)=>{
        gi.items=[]
        j.forEach((ji)=>{
          if (ji.title===gi.title){
            gi.items.push(ji.value)
          }
        })

        if (gi.items.length===0){
          gi.newItem()
        }
      })
  }

  

  private getItemDisplay(item:SF1SearchCondition){
    let k=item.title
    let op=''
    let v=''
    item.items.forEach((vi)=>{
      if (vi.value){
        if (!op) {
          op=vi.op
        }
        else {
          v+=' '+vi.op+' '
        }
        v+=vi.value
      }
    })

    if (v) {
      return op+' '+k+'=('+v+')'
    }
    else{
      return ''
    }
  }

  private getDateItemDisplay(item:SF1SearchCondition){
    let k=item.title
    let v=''
    item.items.forEach((vi)=>{
      let f=vi.from
      let t=vi.to
      let vs=''
      
      switch (vi.mode){
          case '0':
            if (f && t){
              vs='(from '+moment(f).format('YYYYMMDD') + ' to ' + moment(t).format('YYYYMMDD')+')'
            }
            break
          case '1':
            if (t){
              vs='(to ' + moment(t).format('YYYYMMDD')+')'
            }
            break
          case '2':
            if (f){
              vs='(from '+moment(f).format('YYYYMMDD')+')'
            }
            break
          case '3':
            if (f){
              vs='('+moment(f).format('YYYYMMDD')+')'
            }
            break
      }

      if (vs){
          v+=(' '+vi.op+' '+k+'='+vs)
      }
    })

    return v
  }

  private getGroupDisplay(g:Array<SF1SearchCondition>){
    let r=new Array<string>()

    g.forEach((c)=>{
      let v=this.getItemDisplay(c)
      if (v){
        r.push(v)
      }
    })

    return r
  }

  private getDateDisplay(g:Array<SF1SearchCondition>){
    let r=new Array<string>()

    g.forEach((c)=>{
      let v=this.getDateItemDisplay(c)
      if (v){
        r.push(v)
      }
    })

    return r
  }

  getDisplay(){
    let r=new Array<string>()
    r=r.concat(this.getGroupDisplay(this.key_group))
    r=r.concat(this.getGroupDisplay(this.code_group))
    r=r.concat(this.getGroupDisplay(this.type_group))
    r=r.concat(this.getGroupDisplay(this.name_group))
    r=r.concat(this.getDateDisplay(this.date_group))

    if (r.length>0){
      if (r[0].startsWith('AND') || r[0].startsWith('NOT')){
        r[0]=r[0].substr(4,r[0].length-4)
      }
      else if (r[0].startsWith('OR')){
        r[0]=r[0].substr(3,r[0].length-3)
      }
    }

    let rs=new Array<Array<string>>()
    rs.push(r)
    this.sec_group.forEach((g)=>{
      let gr=this.getGroupDisplay(g)
      if (gr){
        rs.push(gr)
      }
    })

    return rs
  }

  getDisplayAt(i){
    let r=this.getDisplay()
    if (r.length>i) {
      return r[i].join(' ')
    }
    return ''
  }

}
