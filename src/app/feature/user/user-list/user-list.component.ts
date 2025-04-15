import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: false
})
export class UserListComponent implements OnInit, OnDestroy {
  title = 'User-List';
  users: User[] = [];
  subscription!: Subscription;

  constructor(private userSvc: UserService) {}

  ngOnInit(): void {
    this.subscription = this.userSvc.list().subscribe(data => {
      this.users = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
