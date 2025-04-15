import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request.service';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css'],
  standalone: false
})
export class RequestEditComponent implements OnInit, OnDestroy {
  title = 'Request Edit';
  requestId!: number;
  request!: Request;
  subscription!: Subscription;

  constructor(
    private requestSvc: RequestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.requestId = params['id'];
      this.subscription = this.requestSvc.getById(this.requestId).subscribe(r => this.request = r);
    });
  }

  save(): void {
    this.requestSvc.update(this.request).subscribe(() => {
      this.router.navigateByUrl('/request-list');
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
