import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RequestCreate } from '../../../model/request-create';
import { RequestService } from '../../../service/request.service';
import { UserService } from '../../../service/user.service';
import { User } from '../../../model/user';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css'],
  standalone: false
})
export class RequestCreateComponent implements OnInit, OnDestroy {
  title = 'Request Create';
  newRequest: RequestCreate = new RequestCreate();
  users: User[] = [];
  subscription!: Subscription;
  loggedInUser!: User;

  constructor(
    private requestSvc: RequestService,
    private userSvc: UserService,
    private sysSvc: SystemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.newRequest.userId = this.loggedInUser.id;
  }
  

  addRequest(): void {
    this.subscription = this.requestSvc.add(this.newRequest).subscribe(() => {
      this.router.navigateByUrl('/request-list');
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
