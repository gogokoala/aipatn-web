import { Component, OnInit } from '@angular/core';

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

  ngOnInit() {
    this.a = new BClass()
    this.a.id = 10
    this.a.name = 'demo'

    const s = JSON.stringify(this.a)
    console.log('a.json = ' + s)

    this.b = Object.assign(new BClass(), JSON.parse(s))
    console.log('b.id = ' + this.b.getValue())


  }

}
