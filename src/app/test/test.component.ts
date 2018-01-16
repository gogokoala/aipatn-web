import { Component, OnInit } from '@angular/core';
import { PDFJS } from 'assets/pdfjs/pdf';

interface A {
  id: number
  name: string
}

class BClass implements A {
  id: number
  name: string

  getValue() {
    return this.id
  }
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  private a: BClass
  private b: BClass

  private showPdf(url) {
    let pdfView = document.getElementById('pdfView');
    pdfView.innerHTML = '';

    PDFJS.getDocument('/assets/pdfjs/test.pdf').then(function (pdf) {
      console.log(pdf.numPages)
      let curPage = 1
      showPage()

      function showPage() {
        pdf.getPage(curPage).then(function (page) {
          let cav = document.createElement('canvas') as HTMLCanvasElement
          cav.style.margin = '4px'
          cav.style.display = 'block'
          pdfView.appendChild(cav)

          let context = cav.getContext('2d');

          let viewport = page.getViewport(1);
          cav.height = viewport.height;
          cav.width = viewport.width;

          // Render PDF page into canvas context.
          var renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          page.render(renderContext);

          curPage++
          if (curPage <= pdf.numPages) {
            showPage()
          }
        })
      }

    })
  }

  ngOnInit() {
    this.a = new BClass()
    this.a.id = 10
    this.a.name = 'demo'

    const s = JSON.stringify(this.a)
    console.log('a.json = ' + s)

    this.b = Object.assign(new BClass(), JSON.parse(s))
    console.log('b.id = ' + this.b.getValue())

    this.showPdf('/assets/pdfjs/test.pdf')
  }

}
