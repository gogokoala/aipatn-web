import { Component, OnInit } from '@angular/core';
import { utils } from 'protractor';

import{ ConfirmationService } from 'primeng/primeng'
import { UtilsService } from '../../utils/utils.service'



@Component({
  selector: 'app-roles-mng',
  templateUrl: './roles-mng.component.html',
  styleUrls: ['./roles-mng.component.css'],
})
export class RolesMngComponent implements OnInit {

  roleList:Array<any>
  funcList:Array<any>
  curRole:any=null

  dlg:any={
    show:false,
    text:''
  }

  constructor(
    utils:UtilsService,
    private confirmationService: ConfirmationService
  ) { 
    this.roleList=[...utils.roleList]

    for (let i=4;i<=20;i++){
      this.roleList.push({
        value:i,label:'角色'+i
      })
    }

    this.curRole=this.roleList[0]
    
    this.funcList=utils.getFuncList()

  }

  ngOnInit() {
    
  }

  doAdd(){
    this.dlg.text=""
    this.dlg.show=true
  }

  doAddOK(){
    if (this.dlg.text.trim()=="") return

    let role={
      value:this.roleList[this.roleList.length-1].value+1,
      label:this.dlg.text,
      func:[]
    }

    let list=[...this.roleList]
    list.push(role)
    
    this.roleList=list
    this.curRole=role

    this.dlg.show=false
  }

  doRemove() {
    this.confirmationService.confirm({
      message: "确实要删除指定的角色吗?",
      header: "删除角色",
      accept: () => {
        let list=[...this.roleList]
        let i=list.indexOf(this.curRole)
        if (i<0) return
        list.splice(i,1)
        this.roleList=list

        if (i<list.length){
          this.curRole=list[i]
        }
        else{
          this.curRole=list[list.length-1]
        }
      }
    });
  }

}
