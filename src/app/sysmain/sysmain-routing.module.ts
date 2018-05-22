import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountMngComponent } from './account-mng/account-mng.component'
import { RolesMngComponent } from './roles-mng/roles-mng.component'
import { FuncMngComponent } from './func-mng/func-mng.component'
import { TaskMngComponent } from './task-mng/task-mng.component'
import { PicMngComponent } from './pic-mng/pic-mng.component'
import { BusnsMngComponent } from './busns-mng/busns-mng.component'
import { LinkMngComponent } from './link-mng/link-mng.component'

const routes: Routes = [
  { path: 'accountmng', component: AccountMngComponent },
  { path: 'rolesmng', component: RolesMngComponent },
  { path: 'funcmng', component: FuncMngComponent },
  { path: 'taskmng', component: TaskMngComponent },
  { path: 'picmng', component: PicMngComponent },
  { path: 'busnsmng', component: BusnsMngComponent },
  { path: 'linkmng', component: LinkMngComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysmainRoutingModule { }
