import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busns-mng',
  templateUrl: './busns-mng.component.html',
  styleUrls: ['./busns-mng.component.css']
})
export class BusnsMngComponent implements OnInit {
  list:Array<any>=[]
  curItems:Array<any>=[]
  first:number=0

  constructor() { }

  ngOnInit() {
    for (let i=1;i<=70;i++){
      this.list.push({
        id:i,
        name:"业务"+i,
        desc:"业务说明"+i
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
