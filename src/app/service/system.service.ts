import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  // 🔥 Internal subject to track login state
  private loggedInUserSubject = new BehaviorSubject<User>(new User());

  // 🔄 Public observable the app can subscribe to
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  constructor(private router: Router) {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      const user: User = JSON.parse(userData);
      this.loggedInUserSubject.next(user);
    }
  }

  // ✅ Update the current user
  setLoggedInUser(user: User): void {
    this.loggedInUserSubject.next(user);
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  // ✅ Clear current user
  clearLoggedInUser(): void {
    this.loggedInUserSubject.next(new User());
    localStorage.removeItem('loggedInUser');
  }

  // ✅ Getter for current value (not observable)
  get loggedInUser(): User {
    return this.loggedInUserSubject.value;
  }

  isAdmin(): boolean {
    return this.loggedInUser?.admin ?? false;
  }

  isReviewer(): boolean {
    return this.loggedInUser?.reviewer ?? false;
  }

  checkLogin(): void {
    if (!this.loggedInUser || this.loggedInUser.id === 0) {
      console.log('User not authenticated. Redirecting to login.');
      this.router.navigateByUrl('/user-login');
    }
  }
}
