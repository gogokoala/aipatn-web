import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { CalendarModule, AccordionModule } from 'primeng/primeng'

import { SF1Service } from './sf1.service'
import { SF1RoutingModule } from './sf1-routing.module'

import { SF1ListComponent } from './sf1-list/sf1-list.component'
import { ComplexSearchComponent } from './complex-search/complex-search.component'
import { SimpleSearchComponent } from './simple-search/simple-search.component'
import { SF1DetailComponent } from './sf1-detail/sf1-detail.component'
import { SF1SearchExp } from './sf1-search.service'

import { FooterComponent } from '../footer/footer.component';
import { HighlightTextDirective } from './highlight-text.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    AccordionModule,
    SF1RoutingModule
  ],
  declarations: [
    SimpleSearchComponent,
    ComplexSearchComponent,
    SF1ListComponent,
    SF1DetailComponent,
    FooterComponent,
    HighlightTextDirective,
  ],
  providers: [
    SF1Service,
    SF1SearchExp
  ]
})

export class SF1Module {

}
