import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountMngComponent } from './account-mng/account-mng.component'

const routes: Routes = [
  { path: 'accountmng', component: AccountMngComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysmainRoutingModule { }
