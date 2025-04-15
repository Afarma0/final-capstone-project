import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { User } from '../../../model/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  standalone: false
})
export class UserEditComponent implements OnInit, OnDestroy {
  title = 'User-Edit';
  userId!: number;
  user!: User;
  subscription!: Subscription;

  constructor(
    private userSvc: UserService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe(params => {
      this.userId = params['id'];
      this.subscription = this.userSvc.getById(this.userId).subscribe({
        next: data => this.user = data,
        error: err => console.log('Error fetching user:', err)
      });
    });
  }

  save(): void {
    this.userSvc.update(this.user).subscribe({
      next: () => this.router.navigateByUrl('/user-list'),
      error: err => console.log('Error updating user:', err)
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
