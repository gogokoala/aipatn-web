import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchKeyword: string

  constructor() { }

  ngOnInit() {
  }

  doSearch() {
    if (this.searchKeyword) {
    }
  }

  doClear() {
    if (this.searchKeyword) {
      this.searchKeyword = ''
    }
  }

}
