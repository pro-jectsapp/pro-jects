import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: '../views/login/login.component.html',
  styleUrls: ['../views/login/login.component.styl'],
})
export class LoginComponent {
  tokenValue: string;

  constructor(private authService: AuthService) {}

  login() {
    const redirectUrl = 'localhost';
    const clientId = '9031bbfc20036dd75d11';
    window.location.href = `https://github.com/login/oauth/authorize?scope=repo%20write%3Aorg%20user&client_id=${clientId}`;
  }
}
