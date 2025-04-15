import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css'],
  standalone: false
})
export class RequestDetailComponent implements OnInit, OnDestroy {
  title = 'Request Detail';
  request!: Request;
  requestId!: number;
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

  delete(): void {
    this.requestSvc.delete(this.requestId).subscribe(() => {
      this.router.navigateByUrl('/request-list');
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
