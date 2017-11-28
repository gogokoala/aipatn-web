import { ElementRef} from '@angular/core';
import { Directive, Input, Renderer } from '@angular/core';
import { SF1Service } from './sf1.service';

@Directive({
  selector: '[appHighlightText]'
})
export class HighlightTextDirective {

  @Input('appHighlightText') appHighlightText: any;

  constructor(private el: ElementRef, private service: SF1Service, private renderer: Renderer) {
    console.log(this.appHighlightText)
  }

/*
  const el1 = this.renderer.createElement(this.el.nativeElement, 'p')
  this.renderer.createText(el1, this.data.toString())


  ngAfterViewInit() { // 模板中的元素已创建完成
    console.dir(this.elementRef.nativeElement.querySelector('div'));
    // let greetDiv: HTMLElement = this.elementRef.nativeElement.querySelector('div');
    // greetDiv.style.backgroundColor = 'red';
  }
*/
}
