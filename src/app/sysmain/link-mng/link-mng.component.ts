import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-link-mng',
  templateUrl: './link-mng.component.html',
  styleUrls: ['./link-mng.component.css']
})
export class LinkMngComponent implements OnInit {

  list:Array<any>=[]
  curItems:Array<any>=[]
  first:number=0

  constructor() { }

  ngOnInit() {
    for (let i=1;i<=70;i++){
      this.list.push({
        id:i,
        name:"链接"+i,
        desc:"链接描述"+i,
        url:"http://www.163.com",
      })
    }
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

}
