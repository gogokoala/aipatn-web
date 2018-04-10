import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

/* primeng */
import {     
  DataTableModule,
  DialogModule,
  InputTextModule,
  ButtonModule,
  DropdownModule,
  MultiSelectModule,
  ListboxModule,
  CheckboxModule
} from 'primeng/primeng'

import { UtilsModule } from '../utils/utils.module'

import { SysmainRoutingModule } from './sysmain-routing.module'

import { AccountMngComponent } from './account-mng/account-mng.component';
import { AccountEditorComponent } from './account-editor/account-editor.component';
import { AccountPowerEditorComponent } from './account-power-editor/account-power-editor.component'

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
    CheckboxModule,

    UtilsModule,

    SysmainRoutingModule
  ],
  declarations: [
    AccountMngComponent,
    AccountEditorComponent,
    AccountPowerEditorComponent
  ]
})
export class SysmainModule {
  

}
