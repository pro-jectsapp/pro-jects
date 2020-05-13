import { Component, HostListener } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: '../views/login/login.component.html',
  styleUrls: ['../views/login/login.component.styl'],
})
export class LoginComponent {
  private keystrokesHistory = '';

  constructor(private authService: AuthService) {}

  @HostListener('document:keydown', ['$event'])
  onKeyDown(e) {
    this.keystrokesHistory += e.key;

    if (this.keystrokesHistory === 'dev') {
      const token = prompt(
        'Entered dev mode. Now you can enter the access token manually, without using oauth',
      );
      if (token) {
        this.authService.setUser(token);
      }
      this.keystrokesHistory = '';
    }
  }

  login() {
    const clientId = '435bb3ee9ba9d983cb60';
    window.location.href = `https://github.com/login/oauth/authorize?scope=repo%20write%3Aorg%20user&client_id=${clientId}`;
  }
}
