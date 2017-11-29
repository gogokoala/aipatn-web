import { NgModule } from '@angular/core'
import {PreloadAllModules, RouterModule,  Routes} from '@angular/router';
import { TestComponent } from './test/test.component'

const appRoutes: Routes = [
  { path: '', redirectTo: 'sf1', pathMatch: 'full' },
  { path: 'test', component: TestComponent },
  { path: 'sf1', loadChildren: 'app/sf1/sf1.module#SF1Module' }
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
