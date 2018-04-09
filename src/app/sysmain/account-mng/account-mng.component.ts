import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-mng',
  templateUrl: './account-mng.component.html',
  styleUrls: ['./account-mng.component.css']
})

export class AccountMngComponent implements OnInit {
  list:Array<any>=[]
  curItems:Array<any>=[]

  constructor(){
    for (let i=1;i<=120;i++){
      
      this.list.push({
        id: i,name:"姓名"+i,code:'12345678910',roles:i<10?'系统管理员':'一般用户'
      })
    }
  }

  ngOnInit() {
  }

  editItem(item:any){
    alert(item.name)
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
    
  }

}
