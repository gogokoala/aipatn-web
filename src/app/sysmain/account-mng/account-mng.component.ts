import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-mng',
  templateUrl: './account-mng.component.html',
  styleUrls: ['./account-mng.component.css']
})

export class AccountMngComponent implements OnInit {
  list:Array<any>=[]
  curItems:Array<any>=[]
  first:number=0

  editor={
    item:null,
    show:false,
    data:{}
  }

  sexList:Array<any>=[
    {value:1,label:'先生'},{value:2,label:'女士'}
  ]

  roleList:Array<any>=[
    {value:1,label:'系统管理员'},{value:2,label:'一般用户'},{value:3,label:'白金会员'}
  ]

  constructor(){
    for (let i=1;i<=120;i++){
      
      this.list.push({
        id: i,
        name:"姓名"+i,
        code:'12345678910',
        mail:'12345678910@qq.com',
        roles:i<10?'系统管理员':'一般用户'
      })
    }
  }

  ngOnInit() {
  }

  editItem(item:any){
    this.editor.item=item;
    this.editor.data=Object.assign({},item);
    this.editor.show=true
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
    this.editor.item=null
    this.editor.data={
      id:this.list[this.list.length-1].id+1
    }
    this.editor.show=true;
  }

  cancel(){
    this.editor.show=false;
  }

  save(){
    if (this.editor.item!=null){
      Object.assign(this.editor.item,this.editor.data)
    }
    else{
      let list=[...this.list]
      list.push(this.editor.data)
      this.list=list
      this.first=Math.ceil((this.list.length-1)/20)*20
    }
    this.editor.show=false 
    
  }



}
