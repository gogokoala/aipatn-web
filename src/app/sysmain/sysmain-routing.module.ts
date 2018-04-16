import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountMngComponent } from './account-mng/account-mng.component'
import { RolesMngComponent } from './roles-mng/roles-mng.component'

const routes: Routes = [
  { path: 'accountmng', component: AccountMngComponent },
  { path: 'rolesmng', component: RolesMngComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysmainRoutingModule { }
