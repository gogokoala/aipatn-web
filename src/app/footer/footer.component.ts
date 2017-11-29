import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  company = '江苏派拓源信息技术有限公司'
  address = '江苏省无锡市'
  hotline = '4001-185-185'
  icp = '苏ICP备17071099号-1'
  about_url = '#'

  constructor() { }

  ngOnInit() {
  }

}
