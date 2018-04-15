import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { UtilsService } from '../../utils/utils.service'
import { AccountPowerEditorComponent } from '../account-power-editor/account-power-editor.component';
import { utils } from 'protractor';

@Component({
  selector: 'app-account-editor',
  templateUrl: './account-editor.component.html',
  styleUrls: ['./account-editor.component.css']
})


export class AccountEditorComponent implements OnInit {
  
  show:boolean=false
  data:any={}

  sexList:Array<any>
  roleList:Array<any>

  utils:UtilsService

  @Output()
  save= new EventEmitter()

  @ViewChild(AccountPowerEditorComponent)
  powerEditor:AccountPowerEditorComponent

  constructor(
    utils:UtilsService
  ) { 
    this.utils=utils
    this.sexList=utils.sexList
    this.roleList=utils.roleList
  }

  ngOnInit() {

  }

  private cancel(){
    this.show=false
  }

  private ok(){
    this.show=false
    this.save.next(this.data)
    
  }

  public open(data:any){
    this.data=data
    this.show=true
  }

  public setPower(){
    this.data.power=this.utils.getPowerList(this.data.roles)
    this.powerEditor.open(this.data.power)
  }

}
