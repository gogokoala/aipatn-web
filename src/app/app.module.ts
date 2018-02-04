import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpModule } from '@angular/http'

/* App Component */
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'

/* Routing Module */
import { AppRoutingModule } from './app-routing.module'

/* Feature Modules */
import { SF1Module } from './sf1/sf1.module'

/* Service */
import { UserService } from './services/user.service'
import { LoginComponent } from './login/login.component';

/* Home Components */
import { HomeComponent } from './home/home.component'
import { AdComponent } from './home/ad/ad.component';
import { SearchComponent } from './home/search/search.component';
import { NewsComponent } from './home/news/news.component';
import { BusinessComponent } from './home/business/business.component';
import { TeamComponent } from './home/team/team.component';

import { UserDeskComponent } from './userdesk/userdesk.component';
// import { TestComponent } from './test/test.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    AdComponent,
    SearchComponent,
    NewsComponent,
    BusinessComponent,
    TeamComponent,
    UserDeskComponent,
    //    TestComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    SF1Module,
  ],
  providers: [
    UserService,
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
