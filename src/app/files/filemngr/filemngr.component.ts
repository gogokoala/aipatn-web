import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

// const URL = '/api/';
// const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
const URL = 'http://192.168.0.216:3000/upload/';

@Component({
  selector: 'app-filemngr',
  templateUrl: './filemngr.component.html',
  styleUrls: ['./filemngr.component.css']
})
export class FilemngrComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({url: URL});

  constructor() { }

  ngOnInit() {
    console.log(this.uploader)
  }

}
