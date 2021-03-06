import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private user: UserService
  ) { }

  ngOnInit() {
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
