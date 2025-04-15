import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Request } from '../../../model/request';
import { LineItem } from '../../../model/line-item';
import { SystemService } from '../../../service/system.service';
import { RequestService } from '../../../service/request.service';
import { LineItemService } from '../../../service/line-item.service';

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css'],
  standalone: false
})
export class RequestLinesComponent implements OnInit, OnDestroy {
  title: string = 'Request Lines';
  subscription!: Subscription;
  requestId!: number;
  request!: Request;
  lineItems: LineItem[] = [];

  constructor(
    private sysSvc: SystemService,
    private requestSvc: RequestService,
    private lineItemSvc: LineItemService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe(params => {
      this.requestId = +params['id'];
      if (isNaN(this.requestId)) return;
      this.loadRequestAndLines();
    });
  }

  loadRequestAndLines(): void {
    this.lineItemSvc.getLinesForRequest(this.requestId).subscribe({
      next: (lines) => {
        this.lineItems = lines;

        setTimeout(() => {
          this.requestSvc.getById(this.requestId).subscribe(updated => {
            this.request = updated;
          });
        }, 200);
      },
      error: err => console.error('Error loading line items:', err)
    });
  }

  submitRequest(): void {
    console.log('Submit clicked for request:', this.request);

    if (this.request.status === 'NEW' && this.lineItems.length > 0) {
      this.requestSvc.submitForReview(this.request.id).subscribe({
        next: () => {
          console.log('Request submitted successfully. Redirecting...');
          this.router.navigate(['/request-list']); // ✅ Step 4: redirect after submit
        },
        error: err => console.error('Error submitting request for review:', err)
      });
    } else {
      console.warn('Submit blocked: not NEW or no line items');
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
