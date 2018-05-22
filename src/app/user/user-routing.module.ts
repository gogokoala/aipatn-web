import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { UserInfoComponent } from './user-info/user-info.component'
import { BindComponent } from './bind/bind.component'
import { ContactComponent } from './contact/contact.component'
import { MsgComponent } from './msg/msg.component'
import { PointComponent } from './point/point.component'
import { RealNameComponent } from './real-name/real-name.component'
import { SecurityComponent } from './security/security.component'
import { TaskComponent } from './task/task.component'


const routes: Routes = [
  { path: 'userinfo', component: UserInfoComponent },
  { path: 'bind', component: BindComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'msg', component: MsgComponent },
  { path: 'point', component: PointComponent },
  { path: 'realname', component: RealNameComponent },
  { path: 'security', component: SecurityComponent },
  { path: 'task', component: TaskComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
