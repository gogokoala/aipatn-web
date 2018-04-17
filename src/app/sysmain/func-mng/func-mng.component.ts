import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../utils/utils.service'

@Component({
  selector: 'app-func-mng',
  templateUrl: './func-mng.component.html',
  styleUrls: ['./func-mng.component.css']
})
export class FuncMngComponent implements OnInit {

  kindList:Array<any>=[
    {label:'0-登录可见',value:0},
    {label:'1-服务授权',value:1},
    {label:'2-系统管理',value:2},
    {label:'3-内部功能',value:3}
  ]

  payList:Array<any>=[
    {label:'0-不计费',value:0},
    {label:'1-按期计费',value:1},
    {label:'2-按次计费',value:2},
  ]

  curItems:Array<any>=[]
  funcList:Array<any>
  curFunc:any
  
  first:number=0

  editor:any={
    show:false,
    mode:0,
    data:{},
    item:{}
  }
  constructor(
    utils:UtilsService
  ) { 
    this.funcList=utils.menus
    this.curFunc=this.funcList[0]
  }

  ngOnInit() {
  }

  doRemove(){
    this.curFunc.links=this.curFunc.links.filter((item,index)=>{
      for (let i=0;i<this.curItems.length;i++){
        if (item.text==this.curItems[i].text){
          return false;
        }
      }
      return true;
    })
    
    this.curItems=[]
  }

  editorOK(){
    if (this.editor.mode==1){
      Object.assign(this.editor.item,this.editor.data)
    }
    else{
      let list=[...this.curFunc.links]
      list.push(Object.assign({},this.editor.data))
      this.curFunc.links=list
    }
    
    this.editor.show=false
  }

  doEdit(item){
    this.editor.item=item
    this.editor.data=Object.assign({},item)
    this.editor.mode=1
    this.editor.show=true
  }

  doAdd(){
    this.editor.item=null
    this.editor.data={
      text:"",href:"",kind:0
    }
    this.editor.mode=0
    this.editor.show=true
  }

}
