import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menus:Array<any>=[
    {
      group:"专利检索",
      links:[
        {text:"简单检索", href:"#"},
        {text:"高级检索", href:"#"},
        {text:"检索文件夹", href:"#"},
        {text:"专有库", href:"#"},
      ]
    },
    {
      group:"专利报告",
      links:[
        {text:"报告文件夹", href:"#"},
        {text:"报告上传", href:"#"},
      ]
    },
    {
      group:"案件管理",
      links:[
        {text:"案件处置", href:"#"},
        {text:"案件进展", href:"#"},
        {text:"案件费用", href:"#"},
        {text:"案件评价", href:"#"},
        {text:"售后服务", href:"#"},
        {text:"统计分析", href:"#"},
      ]
    },
    {
      group:"文章管理",
      links:[
        {text:"文章发布", href:"#"},
        {text:"图片管理", href:"#"},
        {text:"文件管理", href:"#"},
        {text:"问答互动", href:"#"},
      ]
    },
    {
      group:"会员资料",
      links:[
        {text:"基本资料", href:"#"},
        {text:"实名认证", href:"#"},
        {text:"联系方法", href:"#"},
        {text:"账户安全", href:"#"},
        {text:"账户绑定", href:"#"},
        {text:"会员积分", href:"#"},
        {text:"我的任务", href:"#"},
        {text:"消息邮件", href:"#"},
      ]
    },
    {
      group:"系统维护",
      links:[
        {text:"会员维护", href:"#"},
        {text:"角色设置", href:"#"},
        {text:"授权项目", href:"#"},
        {text:"会员任务", href:"#"},
        {text:"宣传图片", href:"#"},
        {text:"主营业务", href:"#"},
        {text:"友情链接", href:"#"},
      ]
    },
  ]

  activeIndex:number=-1;

  constructor() { }

  ngOnInit() {
  }

  menuOnClick(i){
    if (this.activeIndex==i){
      this.activeIndex=-1;
    }
    else{
      this.activeIndex=i;
    }
  }

}
