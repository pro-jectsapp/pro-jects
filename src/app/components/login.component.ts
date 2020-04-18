import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: '../views/login/login.component.html',
  styleUrls: ['../views/login/login.component.styl'],
})
export class LoginComponent {
  constructor() {}

  login() {
    const clientId = '435bb3ee9ba9d983cb60';
    window.location.href = `https://github.com/login/oauth/authorize?scope=repo%20write%3Aorg%20user&client_id=${clientId}`;
  }
}
