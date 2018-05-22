import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule,  Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { UserDeskComponent } from './userdesk/userdesk.component'
import { FilemngrComponent } from './files/filemngr/filemngr.component'

// import { TestComponent } from './test/test.component'

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'userdesk', component: UserDeskComponent },
//  { path: 'test', component: TestComponent },
  { path: 'sf1', loadChildren: 'app/sf1/sf1.module#SF1Module' },
  { path: 'sysmain', loadChildren: 'app/sysmain/sysmain.module#SysmainModule' },
  { path: 'user', loadChildren: 'app/user/user.module#UserModule' },
  { path: 'filemngr', component: FilemngrComponent },
]

@NgModule({
  imports: [ RouterModule.forRoot(
    appRoutes,
    {
      enableTracing: true, // <-- debugging purposes only
      preloadingStrategy: PreloadAllModules,
      useHash: true
    }
) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
