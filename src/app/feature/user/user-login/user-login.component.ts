import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserLogin } from '../../../model/user-login';
import { Subscription } from 'rxjs';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-user-login',
  standalone: false,
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent implements OnInit, OnDestroy {
  // ????
  title: string = 'User-Login';
  userLogin: UserLogin = new UserLogin();
  subscription!: Subscription;
  message: string = '';

  constructor(
    private userSvc: UserService,
    private router: Router,
    private sysSvc: SystemService
  ) {}

  ngOnInit(): void {
    this.userLogin.username = 'test';
    this.userLogin.password = 'almostdone';
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  login() {
    // call the user userService.login(this.userLogin)
    // expected results????
    // - invalid stuff: invalid login - message displayed
    // - correct stuff: success login - forward to movie list component
    this.subscription = this.userSvc.login(this.userLogin).subscribe({
      next: (resp) => {
        // successful login
        this.sysSvc.setLoggedInUser(resp);
        // nav to movie-list
        this.router.navigateByUrl('/user-list');
      },
      error: (err) => {
        // unsuccessful login
        this.message = 'Invalid login - bad username/pwd combo';
      },
    });
  }
}
