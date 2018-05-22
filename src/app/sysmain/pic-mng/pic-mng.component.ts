import * as moment from 'moment'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pic-mng',
  templateUrl: './pic-mng.component.html',
  styleUrls: ['./pic-mng.component.css']
})
export class PicMngComponent implements OnInit {

  list:Array<any>=[]
  curItems:Array<any>=[]
  first:number=0

  constructor() { }

  ngOnInit() {
    for (let i=1;i<=70;i++){
      this.list.push({
        id:i,
        file:"pic"+i+".jpg",
        desc:"图片描述"+i,
        url:"images/pic"+i+".jpg",
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
