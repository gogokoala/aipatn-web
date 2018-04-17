import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import {
  DataTableModule,
  DialogModule,
  InputTextModule,
  ButtonModule,
  RadioButtonModule,
  DropdownModule,
  MultiSelectModule,
  ListboxModule,
  CheckboxModule,
  ToolbarModule,
  ConfirmDialogModule
} from 'primeng/primeng'

import{ ConfirmationService} from 'primeng/primeng'

import { UtilsModule } from '../utils/utils.module'

import { SysmainRoutingModule } from './sysmain-routing.module'

import { AccountMngComponent } from './account-mng/account-mng.component';
import { AccountEditorComponent } from './account-editor/account-editor.component';
import { AccountPowerEditorComponent } from './account-power-editor/account-power-editor.component';

import { RolesMngComponent } from './roles-mng/roles-mng.component';
import { FuncMngComponent } from './func-mng/func-mng.component'

@NgModule({
  imports: [
    FormsModule,
    CommonModule,

    DataTableModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    RadioButtonModule,
    DropdownModule,
    MultiSelectModule,
    ListboxModule,
    CheckboxModule,
    ToolbarModule,
    ConfirmDialogModule,

    UtilsModule,

    SysmainRoutingModule
  ],
  declarations: [
    AccountMngComponent,
    AccountEditorComponent,
    AccountPowerEditorComponent,
    RolesMngComponent,
    FuncMngComponent
  ],
  providers:[
    ConfirmationService
  ]
})
export class SysmainModule {

}
