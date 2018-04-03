import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilsService } from './utils.service';

import { TopbarComponent } from './topbar/topbar/topbar.component';
import { TopbarUserComponent } from './topbar/topbar-user/topbar-user.component';
import { TopbarNoticeComponent } from './topbar/topbar-notice/topbar-notice.component';
import { SidebarComponent } from './sidebar/sidebar/sidebar.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TopbarComponent,
    TopbarUserComponent,
    TopbarNoticeComponent,
    SidebarComponent,
  ],
  providers:[
    UtilsService
  ],
  exports:[
    TopbarComponent,
    SidebarComponent,
  ]
})
export class UtilsModule { }
