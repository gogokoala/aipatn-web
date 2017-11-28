import { ElementRef} from '@angular/core';
import { Directive, Input, Renderer2 } from '@angular/core';
import { SF1Service } from './sf1.service';
import { forEach } from '@angular/router/src/utils/collection';

@Directive({
  selector: '[appHighlightText]'
})
export class HighlightTextDirective  {

  @Input('appHighlightText') appHighlightText: any

  constructor(private el: ElementRef, private service: SF1Service, private renderer: Renderer2) {
//    console.dir(this.el.nativeElement)
    setTimeout(() => {
      console.dir(this.appHighlightText)
//      const span = this.getHighLightElement(this.appHighlightText)
      const span = this.getHighLightElement('飞机飞式飞机式工工工工飞机工工工城墙飞机')
      if (span) {
        console.log('h!!')
        console.dir(span)
        this.renderer.appendChild(this.el.nativeElement, span)
      }
    }, 30);
  }

  /**
   * 转义正则特殊字符 （$()*+.[]?\^{},|）
   *
   * @param keyword
   * @return
   */
  escapeExprSpecialWord(keyword: string) {
    if (keyword) {
      const fbsArr: string[] = ['\\', '$', '(', ')', '*', '+', '.', '[', ']', '?', '^', '{', '}', '|' ]
      fbsArr.forEach(key => {
        if (keyword.indexOf(key) >= 0) {
          keyword = keyword.replace(key, '')
        }
      })
    }

    return keyword
  }

  /**
   * 格式化文本，突出显示关键字
   * @param s 文本
   */
  getHighLightElement(s: any): any {
    const keywords = this.service.currentKeywords
    let elementArr: any[]
    if (s && keywords) {
      const text: string = s.toString()
      elementArr = [ text ]

      const span = this.renderer.createText(text)

      keywords.forEach(word => {
        const w = this.escapeExprSpecialWord(word)
        let rr: any[] = []
        elementArr.forEach(el => {
          if (typeof el === 'string') {
            const res = this.highlightKeyword(el, w)
            res.forEach(el1 => {
              rr.push(el1)
            })
            console.log('result')
            console.dir(res)
            rr.concat(res)
            console.log('result1')
            console.dir(rr)
          } else {
            rr.push(el)
          }
        })
        elementArr = rr
        console.dir(elementArr)
//        text = text.replace(w, '<span class="m-highlight">' + w + '</span>')
      })

      elementArr.forEach(el => {
        if (typeof el === 'string') {
          const textNode = this.renderer.createText(el)
          console.log('text node:')
          console.dir(textNode)
          this.renderer.appendChild(span, textNode)
        } else {
          console.log('highlight node')
          console.dir(el)
          this.renderer.appendChild(span, el)
        }
      })

      return span
    }

    return null
  }

  highlightKeyword(s: string, keyword: string) {
    const r: any[] = []
    let m = s.match(keyword)
    while (m) {
      const header = s.substr(0, m.index)
      if (header) {
        r.push(header)
      }

      const elKey = this.renderer.createElement('span')
      const elWord = this.renderer.createText(keyword)
      this.renderer.appendChild(elKey, elWord)
      this.renderer.setAttribute(elKey, 'class', 'm-highlight')
      r.push(elKey)

      s = s.substr(m.index + keyword.length)
      m = s.match(keyword)
    }
    if (s) {
      r.push(s)
    }

    return r
  }
}
