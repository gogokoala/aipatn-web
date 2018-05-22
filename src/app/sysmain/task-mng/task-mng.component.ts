import * as moment from 'moment'
import { Component, OnInit } from '@angular/core'
import { UtilsService } from '../../utils/utils.service'

@Component({
  selector: 'app-task-mng',
  templateUrl: './task-mng.component.html',
  styleUrls: ['./task-mng.component.css']
})
export class TaskMngComponent implements OnInit {

  list:Array<any>=[]
  curItems:Array<any>=[]
  first:number=0

  constructor(
    utils:UtilsService
  ) { 
    let dt=new Date()

    for (let i=1;i<=70;i++){
      this.list.push({
        id:i,
        name:"任务"+i,
        desc:"任务描述"+i,
        start:moment(dt).format("YYYY-MM-DD"),
        stop:moment(dt).add(i,"days").format("YYYY-MM-DD"),
      })
    }
  }

  ngOnInit() {

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
