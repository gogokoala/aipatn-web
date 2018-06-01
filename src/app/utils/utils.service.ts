import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  menus:Array<any>=[
    {
      group:"专利检索",
      img:"url('assets/images/desk/cell01.jpg')",
      links:[
        {text:"简单检索", href:"#/sf1/simple", kind: 1},
        {text:"高级检索", href:"#/sf1/complex", kind: 1},
        {text:"检索文件夹", href:"#/building", kind: 1},
        {text:"专有库", href:"#/building", kind: 1},
      ]
    },
    {
      group:"专利报告",
      img:"url('assets/images/desk/cell02.jpg')",
      links:[
        {text:"报告文件夹", href:"#/building", kind: 1},
        {text:"报告上传", href:"#/building", kind: 1},
      ]
    },
    {
      group:"案件管理",
      img:"url('assets/images/desk/cell03.jpg')",
      links:[
        {text:"案件处置", href:"#/building", kind: 1},
        {text:"案件进展", href:"#/building", kind: 1},
        {text:"案件费用", href:"#/building", kind: 1},
        {text:"案件评价", href:"#/building", kind: 1},
        {text:"售后服务", href:"#/building", kind: 1},
        {text:"统计分析", href:"#/building", kind: 1},
      ]
    },
    {
      group:"文章管理",
      img:"url('assets/images/desk/cell04.jpg')",
      links:[
        {text:"文章发布", href:"#/building", kind: 2},
        {text:"图片管理", href:"#/building", kind: 2},
        {text:"文件管理", href:"#/building", kind: 2},
        {text:"问答互动", href:"#/building", kind: 2},
      ]
    },
    {
      group:"会员资料",
      img:"url('assets/images/desk/cell05.jpg')",
      links:[
        {text:"基本资料", href:"#/user/userinfo", kind: 0},
        {text:"实名认证", href:"#/user/realname", kind: 0},
        {text:"联系方法", href:"#/user/contact", kind: 0},
        {text:"账户安全", href:"#/user/security", kind: 0},
        {text:"账户绑定", href:"#/user/bind", kind: 0},
        {text:"会员积分", href:"#/user/point", kind: 0},
        {text:"我的任务", href:"#/user/task", kind: 0},
        {text:"消息邮件", href:"#/user/msg", kind: 0},
      ]
    },
    {
      group:"系统维护",
      img:"url('assets/images/desk/cell06.jpg')",
      links:[
        {text:"会员维护", href:"#/sysmain/accountmng", kind: 2},
        {text:"角色设置", href:"#/sysmain/rolesmng", kind: 2},
        {text:"授权项目", href:"#/sysmain/funcmng", kind: 2},
        {text:"会员任务", href:"#/sysmain/taskmng", kind: 2},
        {text:"宣传图片", href:"#/sysmain/picmng", kind: 2},
        {text:"主营业务", href:"#/sysmain/busnsmng", kind: 2},
        {text:"友情链接", href:"#/sysmain/linkmng", kind: 2},
      ]
    },
  ]

  sexList:Array<any>=[
    {value:1,label:'先生'},{value:2,label:'女士'}
  ]

  roleList:Array<any>=[
    {value:0,label:'一般用户'},
    {value:1,label:'内部用户'},
    {value:2,label:'网站维护'},
    {value:3,label:'系统管理'}
  ]
  
  constructor() { }

  public getPowerList(roles:Array<any>){

    if (roles.indexOf('一般用户')<0 && roles.indexOf('内部用户')<0){
      return []
    }

    let p=(roles.indexOf('内部用户')>-1)?100:0
    let r=[]

    this.menus.forEach(m=>{
      m.links.forEach(l=>{
        if (l.kind==1){
          r.push({
            group:m.group,item:l.text,active:p>0?1:0, data:p
          })
        }
      })
    });

    return r
  }

  public getFuncList(){
    let r=[]

    this.menus.forEach(m=>{
      m.links.forEach(l=>{
        if (l.kind==2){
          r.push({
            group:m.group, label:l.text, value:l.text
          })
        }
      })
    });

    return r
  }

}
