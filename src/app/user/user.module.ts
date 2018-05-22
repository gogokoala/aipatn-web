import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilsModule } from '../utils/utils.module'

import { UserRoutingModule } from './user-routing.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { RealNameComponent } from './real-name/real-name.component';
import { ContactComponent } from './contact/contact.component';
import { SecurityComponent } from './security/security.component';
import { BindComponent } from './bind/bind.component';
import { PointComponent } from './point/point.component';
import { TaskComponent } from './task/task.component';
import { MsgComponent } from './msg/msg.component';

@NgModule({
  imports: [
    CommonModule,

    UtilsModule,
    
    UserRoutingModule
  ],
  declarations: [
    UserInfoComponent,
    RealNameComponent,
    ContactComponent, 
    SecurityComponent, 
    BindComponent, 
    PointComponent, 
    TaskComponent, 
    MsgComponent
  ]
})
export class UserModule { }
