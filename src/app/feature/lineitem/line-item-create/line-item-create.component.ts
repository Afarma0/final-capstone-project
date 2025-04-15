import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from '../../../model/line-item';
import { LineItemService } from '../../../service/line-item.service';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-line-item-create',
  templateUrl: './line-item-create.component.html',
  styleUrls: ['./line-item-create.component.css'],
  standalone: false
})
export class LineItemCreateComponent implements OnInit {
  title: string = 'Create Line Item'; 
  lineItem: LineItem = new LineItem();
  requestId!: number;
  products: Product[] = []; 

  constructor(
    private route: ActivatedRoute,
    private lineItemSvc: LineItemService,
    private productSvc: ProductService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.requestId = +this.route.snapshot.paramMap.get('id')!;
    this.lineItem.request = { id: this.requestId } as any;
  
    this.productSvc.list().subscribe({
      next: res => this.products = res,
      error: err => console.error('Error loading products:', err)
    });
  }
  

  createLineItem(): void {
    this.lineItemSvc.add(this.lineItem).subscribe({
      next: () => {
        // Navigate to an empty route first, then to request-lines to force a reload
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/request-lines', this.requestId]);
        });
      },
      error: err => console.error('Error creating line item:', err)
    });
  }
  
  }

