import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../service/request.service';
import { SystemService } from '../../../service/system.service';
import { Request } from '../../../model/request';

@Component({
  selector: 'app-review-requests',
  templateUrl: './review-requests.component.html',
  styleUrls: ['./review-requests.component.css'],
  standalone: false
})

export class RequestReviewComponent implements OnInit {
  title = 'Review Requests';
  requests: Request[] = [];

  constructor(
    private requestSvc: RequestService,
    private sysSvc: SystemService
  ) {}

  ngOnInit(): void {
    const currentUserId = this.sysSvc.loggedInUser?.id;
    if (!currentUserId) return;

    this.requestSvc.getRequestsInReviewNotOwned(currentUserId).subscribe({
      next: res => this.requests = res,
      error: err => console.error('Error loading review requests:', err)
    });
  }
}
