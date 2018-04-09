import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

/* primeng */
import { DataTableModule } from 'primeng/datatable'

import { UtilsModule } from '../utils/utils.module'

import { SysmainRoutingModule } from './sysmain-routing.module'

import { AccountMngComponent } from './account-mng/account-mng.component'

@NgModule({
  imports: [
    CommonModule,

    DataTableModule,

    UtilsModule,

    SysmainRoutingModule
  ],
  declarations: [
    AccountMngComponent
  ]
})
export class SysmainModule {
  

}
