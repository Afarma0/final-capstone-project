import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from '../../../model/line-item';
import { LineItemService } from '../../../service/line-item.service';


@Component({
  selector: 'app-line-item-detail',
  templateUrl: './line-item-detail.component.html',
  styleUrls: ['./line-item-detail.component.css'],
  standalone: false
})
export class LineItemDetailComponent implements OnInit {
  lineItem: LineItem = new LineItem();

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private lineItemSvc: LineItemService
  ) {}

  ngOnInit(): void {
    const id = +this.actRoute.snapshot.paramMap.get('id')!;
    this.lineItemSvc.getById(id).subscribe((data) => {
      this.lineItem = data;
    });
  }
  delete(): void {
    this.lineItemSvc.delete(this.lineItem.id).subscribe({
      next: () => this.router.navigate(['/request-lines', this.lineItem.request.id]),
      error: err => console.error('Error deleting LineItem:', err)
    });
  }
  
}
