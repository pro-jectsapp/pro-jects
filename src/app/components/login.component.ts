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
    if (this.tokenValue && this.tokenValue.length === 40) {
      this.authService.setUser(this.tokenValue);
    } else {
      alert('Give valid GitHub Access Token');
    }
  }
}
