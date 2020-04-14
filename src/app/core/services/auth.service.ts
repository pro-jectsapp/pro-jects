import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedIn = new EventEmitter();
  public loggedOut = new EventEmitter();

  constructor() {}

  setUser(token): void {
    window.localStorage.setItem('githubToken', token);
    this.loggedIn.emit();
  }

  getUser(): string {
    return window.localStorage.getItem('githubToken');
  }

  logoutUser(): void {
    window.localStorage.removeItem('githubToken');
    this.loggedOut.emit();
  }

  isLoggedIn(): boolean {
    return !!window.localStorage.getItem('githubToken');
  }
}
