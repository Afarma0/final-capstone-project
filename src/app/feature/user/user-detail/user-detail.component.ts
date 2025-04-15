import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../../service/user.service';
import { User } from '../../../model/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  standalone: false
})
export class UserDetailComponent implements OnInit, OnDestroy {
  title = 'User-Detail';
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
        error: err => console.log('Error retrieving user:', err)
      });
    });
  }

  delete(): void {
    this.userSvc.delete(this.userId).subscribe({
      next: () => this.router.navigateByUrl('/user-list'),
      error: err => console.log(err)
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
