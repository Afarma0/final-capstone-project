import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  standalone: false
})
export class UserCreateComponent implements OnInit, OnDestroy {
  title = 'User-Create';
  newUser: User = new User();
  subscription!: Subscription;

  constructor(private userSvc: UserService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  addUser(): void {
    this.subscription = this.userSvc.add(this.newUser).subscribe(() => {
      this.router.navigateByUrl('/user-list');
    });
  }
}
