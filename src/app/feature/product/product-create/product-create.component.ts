import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  standalone: false
})
export class ProductCreateComponent implements OnInit, OnDestroy {
  title = 'Product Create';
  newProduct: Product = new Product();
  vendors: Vendor[] = [];
  subscription!: Subscription;

  constructor(
    private productSvc: ProductService,
    private vendorSvc: VendorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vendorSvc.list().subscribe(vendors => this.vendors = vendors);
  }

  addProduct(): void {
    this.subscription = this.productSvc.add(this.newProduct).subscribe(() => {
      this.router.navigateByUrl('/product-list');
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
