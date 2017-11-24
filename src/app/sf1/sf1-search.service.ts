import * as moment from 'moment'
import { forEach } from '@angular/router/src/utils/collection'
import * as crypt from 'crypt'
import { ValueTransformer } from '@angular/compiler/src/util';
import { strictEqual } from 'assert';

export class SF1SearchExp {

  fields=[]
  
  values=[]

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

  lastKeyWord:string 

  private nextID=0

  constructor(){
    this.initFields()
    this.clear()
  }

  clear(){
    this.values=[]
    this.newLevel()

    this.db_group[0].checked = true
    this.dbCheckAll(true)
  }

  clearFilter(){
    let l=this.values.length-1
    if (l>0){
      this.values.splice(1,l)
    }
    
  }

  buildKeySearch(text: string) {
    this.clear()
    this.lastKeyWord = text
    this.addValue({field:'所有字段',op:'AND',value:text})
    return this.getValue()
  }

  buildCodeSearch(text: string) {
    this.clear()
    this.lastKeyWord = text
    this.addValue({field:'国际分类号（IPC）',op:'AND',value:text})
    return this.getValue()
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

  private getDBFlag() {
    let r = 0xFFFFFFFF
    let f = 0x00000001

    this.db_group.forEach((d) => {
      d.sub_types.forEach((t) => {
        if (!t.checked) {
          r = (r & ~f)
        }
        f = (f << 1)
      })
    })

    return r
  }

  private setDBFlag(j) {
    let f = 0x00000001

    this.dbCheckAll(true)

    this.db_group.forEach((d) => {
      d.sub_types.forEach((t) => {
        let r = (f & j)
        if (r === 0) {
          t.checked = false
          d.checked = false
          this.db_group[0].checked = false
        }
        f = (f << 1)

      })
    })

  }

  newLevel(){
    let r=[]
    this.values.push(r)
    return r
  }

  private initFields(){

    const k: any[] = [
      { id: 1, name: ['名称', '摘要', '权利要求书', '说明书'], title: '所有字段' },
      { id: 2, name: ['名称', '摘要'], title: '专利名称/摘要' },
      { id: 3, name: ['名称', '摘要', '权利要求书'], title: '专利名称/摘要/权利要求' },
      { id: 4, name: ['名称'], title: '专利名称' },
      { id: 5, name: ['摘要'], title: '摘要' },
      { id: 6, name: ['权利要求书'], title: '权利要求' },
      { id: 8, name: ['说明书'], title: '说明书' },

      { id: 1, name: ['申请号'], title: '申请号' },
      { id: 2, name: ['公开（公告）号'], title: '公开（公告）号' },
      { id: 3, name: ['优先权'], title: '优先权号' },

      { id: 1, name: ['分类号'], title: '国际分类号（IPC）' },
      // { id: 2, name: [], title: '外观分类(Locarno)' },

      { id: 1, name: ['申请（专利权）人'], title: '申请（专利权）人' },
      // { id: 2, name: [], title: '当前专利权人' },
      // { id: 3, name: [], title: '股票代码' },
      { id: 4, name: ['发明（设计）人'], title: '发明人' },
      { id: 5, name: ['代理人'], title: '代理人' },
      { id: 6, name: ['专利代理机构'], title: '代理机构' },
      { id: 8, name: ['地址'], title: '申请人地址' },
    ]

    const d: any[] = [
      { id: 1, name: ['申请日'], title: '申请日' },
      { id: 2, name: ['公开（公告）日'], title: '公开（公告）日' },
      { id: 3, name: ['优先权日'], title: '授权日' },
    ]

    k.forEach((ki)=>{
      this.fields.push({
        mode: 1, name: ki.name, title: ki.title
      })
    })

    d.forEach((di)=>{
      this.fields.push({
        mode: 2, name: di.name, title: di.title
      })
    })

  }

  findField(field:string){
    for(let i=0;i<this.fields.length;i++){
      let f=this.fields[i]
      if (f.title===field){
        return f
      }
    }
    return null
  }

  newID(){
    let id=this.nextID
    this.nextID++

    return id
  }

  resetID(){
    this.nextID=1
    this.values.forEach((lv)=>{
      lv.forEach((f)=>{
        f.values.forEach((v)=>{
          if (v.id>=this.nextID){
            this.nextID=v.id+1
          }
        })
      })
    })
  }

  private getLastLevel(){
      let i=this.values.length-1
      return this.values[i]
  }

  private findLevelField(lv,field){
    for (let i=0;i<lv.length;i++){
      let f=lv[i]
      if (f.field===field){
        return f
      }
    }
    return null
  }

  makeValue(value){
    let v={
      id:this.newID(),
      op:value.op,
      mode: value.mode,
      value: value.value,
      from: value.from,
      to: value.to
    }

    return v
  }

  emptyValue(){
    return this.makeValue({op:'AND',mode:0,value:'',from:null,to:null})
  }

  addValue(value) {
    let lv = this.getLastLevel()

    let f = this.findLevelField(lv,value.field)
    if (!f) {
      f = { field: value.field, values: [] }
      lv.push(f)
    }

    let v=this.makeValue(value)
    f.values.push(v)

    return v
  }

  removeValue(id: number) {
    for (let l = 0; l < this.values.length; l++) {
      let lv = this.values[l]
      for (let i = 0; i < lv.length; i++) {
        let f = lv[i]

        for (let j = 0; j < f.values.length; j++) {
          let v = f.values[j]

          if (v.id === id) {
            f.values.splice(j, 1)
            if (f.values.length === 0) {
              lv.splice(i, 1)
            }
            if (lv.length === 0 && l>0 && l<this.values.length-1 ) {
              this.values.splice(l, 1)
            }
            return
          }

        }

      }
    }
  }

  findValue(id: number) {
    for (let l = 0; l < this.values.length; l++) {
      let lv = this.values[l]
      for (let i = 0; i < lv.length; i++) {
        let f = lv[i]

        for (let j = 0; j < f.values.length; j++) {
          let v = f.values[j]

          if (v.id === id) {
            return v
          }

        }

      }
    }
    return null
  }

  private getDateDisplay(v){
    let mode=parseInt(v.mode)

    if (mode===4) {
      return v.value
    }

    let f = v.from
    let t = v.to

    switch (mode) {
      case 0:
        if (f && t){
          return moment(f).format('YYYYMMDD')+' to '+moment(t).format('YYYYMMDD')
        }
        break
      case 1:
        if (t) {
          return moment(t).format('YYYYMMDD')+'之前'
        }
        break
      case 2:
        if (f) {
          return moment(f).format('YYYYMMDD')+'之后'
        }
        break
      case 3:
        if (f) {
          return moment(f).format('YYYYMMDD')
        }
        break
    }

    return ''
  }

  private getFiledDisplay(f){
    let df = { field: f.field, op: '', values: [] }
    let field = this.findField(f.field)

    f.values.forEach((v) => {
      let dv = ''

      switch (field.mode) {
        case 1:
          dv = v.value
          break
        case 2:
          dv = this.getDateDisplay(v)
          break
      }

      if (dv) {
        let op = v.op
        if (df.op) {
          dv = ' ' + op + ' ' + dv
        }
        else {
          df.op = op
        }

        df.values.push({ id: v.id, text: dv })
      }
    })

    return df
  }

  private getLevelDisplay(lv) {
    let d = []

    lv.forEach((f) => {
      let df=this.getFiledDisplay(f)
      if (df.values.length > 0) {
        d.push(df)
      }
    })

    return d
  }

  getDisplay(){
    let d=[]
    this.values.forEach((lv)=>{
      let dv=this.getLevelDisplay(lv)
      if (dv.length>0){
        d.push(dv)
      }
    })
    return d
  }

  getDisplayText() {
    let d = this.getDisplay()
    let l = ''

    d.forEach((lv) => {
      let r=''
      lv.forEach((f) => {
        if (r) {
          r += (' ' + f.op + ' ')
        }

        r += (f.field+'=(')

        f.values.forEach((v) => {
          r += v.text
        })

        r += ')'
      })
      if (l) {
        l+=' AND '
      }
      l+=('('+r+')')
    })

    return l
  }

  Encode(){
    let d={
      values:this.values,
      dbs:this.getDBFlag()
    }
    return JSON.stringify(d)
  }

  Decode(json){
    let d=JSON.parse(json)

    this.setDBFlag(d.dbs)
    this.values=d.values
  }

  private getDateValue(v) {
    let mode = parseInt(v.mode)

    if (mode === 4) {
      return v.value+'0101 to '+v.value+'1231'
    }

    let f = v.from
    let t = v.to

    switch (mode) {
      case 0:
        if (f && t) {
          return moment(f).format('YYYYMMDD') + ' to ' + moment(t).format('YYYYMMDD')
        }
        break
      case 1:
        if (t) {
          return '19700101 to '+moment(t).format('YYYYMMDD')
        }
        break
      case 2:
        if (f) {
          return moment(f).format('YYYYMMDD') + ' to 22001231'
        }
        break
      case 3:
        if (f) {
          return moment(f).format('YYYYMMDD')
        }
        break
    }

    return ''
  }

  private getFieldValue(field){
      let r=''
      let fop=''
      let f=this.findField(field.field)

      if (!f){
        return ''
      }

      field.values.forEach((v)=>{
        let dv=''
        switch (f.mode){
          case 1:
            dv=v.value
            break
          case 2:
            dv=this.getDateValue(v)
            break
        }
        if (dv){
          let op=v.op
          if (!fop){
            fop=op
          }
          else{
            dv=' '+op+' '+dv
          }

          r+=dv
        }
      })

      if (!r){
        return ''
      }

      let v=''

      f.name.forEach((n)=>{
        if (v){
          v+=' OR '
        }

        v+=(n+'=('+r+')')
      })

      if (f.name.length>1){
        return fop +' ('+v+')'
      }
      else{
        return fop + ' '+ v
      }
  }

  private getLevelValue(lv){
    let r=''

    lv.forEach((f)=>{
      let v=this.getFieldValue(f)
      if (v) {
        if (r) {
          r+=' '
        }
        r+=v
      }
    })

    if (r.startsWith('AND') || r.startsWith('NOT')){
      return r.substr(4,r.length-4)
    }
    else if (r.startsWith('OR')) {
      return r.substr(3,r.length-3)
    }

    return r
  }

  getValue(){
    let r=''

    this.values.forEach((lv)=>{
      let l=this.getLevelValue(lv)
      if (l){
        if (r){
          r+=' AND '
        }
        r+=('('+l+')')
      }
    })

    return r
  }

  linkGroup(group){
    let lv=this.getLastLevel()

    group.forEach((g)=>{
      let f=this.findLevelField(lv,g.title)
      
      if (!f){
        this.addValue({field:g.title, mode:0, op:'AND', value:'', from:null,to:null})
        f=this.findLevelField(lv,g.title)
      }
      
      g.items=f.values
    })
  }

  getKeyWords() {
    let s=[]

    this.values.forEach((lv)=>{
      lv.forEach((f)=>{
        f.values.forEach((v)=>{
            if ((v.value === '') || (v.op === 'NOT')) {
              return
            }
            const i = s.indexOf(v.value)
            if (i < 0) {
              s.push(v.value)
            }
        })
      })
    })
    
    return s
  }

  getFields() {
    let g = new Array<any>()
    let id = 1

    this.fields.forEach((item) => {
      g.push({ id: id, title: item.title, mode: item.mode })
      id++
    })

    return g
  }
}