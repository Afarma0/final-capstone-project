import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from '../../../model/request';
import { LineItem } from '../../../model/line-item';
import { LineItemService } from '../../../service/line-item.service';
import { RequestService } from '../../../service/request.service';

@Component({
  selector: 'app-request-approve',
  templateUrl: './request-approve.component.html',
  styleUrls: ['./request-approve.component.css'],
  standalone: false
})
export class RequestApproveComponent implements OnInit {
  request!: Request;
  lineItems: LineItem[] = [];
  rejectionReason: string = '';

  constructor(
    private requestSvc: RequestService,
    private lineItemSvc: LineItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;

    this.requestSvc.getById(id).subscribe({
      next: res => this.request = res,
      error: err => console.error('Error loading request:', err)
    });

    this.lineItemSvc.getLinesForRequest(id).subscribe({
      next: res => this.lineItems = res,
      error: err => console.error('Error loading line items:', err)
    });
  }

  approve(): void {
    this.requestSvc.approve(this.request.id).subscribe({
      next: () => this.router.navigate(['/request-list']),
      error: err => console.error('Error approving request:', err)
    });
  }

  reject(): void {
    if (this.rejectionReason.trim().length === 0) {
      alert('Rejection reason is required.');
      return;
    }
  
    const rejectedRequest: Request = {
      id: this.request.id,
      user: this.request.user, // required
      requestNumber: this.request.requestNumber,
      description: this.request.description,
      justification: this.request.justification,
      dateNeeded: this.request.dateNeeded,
      deliveryMode: this.request.deliveryMode,
      status: 'REVIEW', // required to pass backend check
      total: this.request.total,
      submittedDate: this.request.submittedDate,
      reasonForRejection: this.rejectionReason
    };
  
    this.requestSvc.reject(rejectedRequest.id, rejectedRequest).subscribe({
      next: () => this.router.navigate(['/request-list']),
      error: err => {
        console.error('Error rejecting request:', err);
        alert('Rejection failed. Check console for details.');
      }
    });
  }
  
}
