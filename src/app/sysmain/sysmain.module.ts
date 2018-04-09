import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

/* primeng */
import { DataTableModule } from 'primeng/datatable'
import { DialogModule } from 'primeng/dialog'
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button'
import { DropdownModule } from 'primeng/dropdown'
import { MultiSelectModule } from 'primeng/multiselect';
import { ListboxModule } from 'primeng/listbox';

import { UtilsModule } from '../utils/utils.module'

import { SysmainRoutingModule } from './sysmain-routing.module'

import { AccountMngComponent } from './account-mng/account-mng.component'

@NgModule({
  imports: [
    FormsModule,
    CommonModule,

    DataTableModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    MultiSelectModule,
    ListboxModule,

    UtilsModule,

    SysmainRoutingModule
  ],
  declarations: [
    AccountMngComponent
  ]
})
export class SysmainModule {
  

}
