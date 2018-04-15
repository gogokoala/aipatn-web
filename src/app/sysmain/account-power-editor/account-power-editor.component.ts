import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-power-editor',
  templateUrl: './account-power-editor.component.html',
  styleUrls: ['./account-power-editor.component.css']
})
export class AccountPowerEditorComponent implements OnInit {

  show:boolean=false
  data:Array<any>
  activeList:Array<any>=[
    {value:0,label:"禁止"},
    {value:1,label:"启用"}
  ]

  constructor() { }

  ngOnInit() {

  }

  open(data:Array<any>){
    this.data=[...data]
    this.show=true
  }

  cancel(){
    this.show=false
  }

  ok(){
    this.show=false
  }

}
