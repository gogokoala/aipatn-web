import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  homeTitle = '律政派拓源'
  companyEMail = 'support@aipatn.com'
  companyHotLine = '4000-000-000'

  constructor(
    private router: Router,
    private user: UserService
  ) {
  }

  ngOnInit() {
  }

  getVCode() {

  }

  doLogin() {
    const action = 'login'
    this.router.navigate(['/login'], { queryParams: { action } });
  }

  doSignIn() {
    const action = 'signin'
    this.router.navigate(['/login'], { queryParams: { action } });
  }


}
