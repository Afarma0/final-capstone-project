import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from '../../../model/line-item';
import { LineItemService } from '../../../service/line-item.service';

@Component({
  selector: 'app-line-item-edit',
  templateUrl: './line-item-edit.component.html',
  styleUrls: ['./line-item-edit.component.css'],
  standalone: false
})
export class LineItemEditComponent implements OnInit {
  lineItem: LineItem = new LineItem();

  constructor(
    private route: ActivatedRoute,
    private lineItemSvc: LineItemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.lineItemSvc.getById(id).subscribe(data => {
      this.lineItem = data;
    });
  }

  save(): void {
    this.lineItemSvc.update(this.lineItem).subscribe({
      next: () => this.router.navigate(['/request-lines', this.lineItem.request.id]),
      error: err => console.error('Error saving line item:', err)
    });
  }
  
}
