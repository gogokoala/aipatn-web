import { Component, OnInit, ViewChild } from '@angular/core'
import { UtilsService } from '../../utils/utils.service'
import { AccountEditorComponent } from '../account-editor/account-editor.component';

@Component({
  selector: 'app-account-mng',
  templateUrl: './account-mng.component.html',
  styleUrls: ['./account-mng.component.css']
})

export class AccountMngComponent implements OnInit {
  list:Array<any>=[]
  curItems:Array<any>=[]
  first:number=0

  editValue:any

  @ViewChild(AccountEditorComponent) editorForm:AccountEditorComponent

  constructor(
    utils:UtilsService
  ){
    for (let i=1;i<=120;i++){
      
      this.list.push({
        id: i,
        name:"姓名"+i,
        code:'12345678910',
        mail:'12345678910@qq.com',
        roles:i<10?['系统管理']:['一般用户']
      })
    }
  }

  ngOnInit() {
  }

  editItem(item:any){
    this.editValue=item;
    let data=Object.assign({},item)

    this.editorForm.open(data)
  }

  delItems(){
    this.list=this.list.filter((item,index)=>{
      for (let i=0;i<this.curItems.length;i++){
        if (item.id==this.curItems[i].id){
          return false;
        }
      }
      return true;
    })
    
    this.curItems=[]
  }

  addItem(){
    this.editValue=null
    let data={
      id:this.list[this.list.length-1].id+1
    }
    this.editorForm.open(data)
  }

  cancel(){
    this.editValue.show=false;
  }

  save(data:any){
    if (this.editValue!=null){
      Object.assign(this.editValue,data)
    }
    else{
      let list=[...this.list]
      list.push(data)
      this.list=list
      this.first=Math.ceil((this.list.length-1)/20)*20
    }
  }

}
