import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: false
})
export class ProductListComponent implements OnInit, OnDestroy {
  title = 'Product List';
  products: Product[] = [];
  subscription!: Subscription;
  sortOrder: string = 'asc';
  sortCriteria: string = 'id';

  constructor(private productSvc: ProductService) {}

  ngOnInit(): void {
    this.subscription = this.productSvc.list().subscribe(data => {
      this.products = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  sortBy(column: string): void{
    if (column == this.sortCriteria) {
      this.sortOrder = (this.sortOrder == "desc") ? "asc" : "desc";
    }
    this.sortCriteria = column;
  }
}
