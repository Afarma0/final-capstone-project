import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css'],
  standalone: false
})
export class RequestListComponent implements OnInit, OnDestroy {
  title = 'Request List';
  requests: Request[] = [];
  subscription!: Subscription;

  constructor(private requestSvc: RequestService) {}

  ngOnInit(): void {
    this.subscription = this.requestSvc.list().subscribe(data => {
      this.requests = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
