import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';
import { VendorService } from '../../../service/vendor.service';
import { Vendor } from '../../../model/vendor';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  standalone: false
})
export class ProductEditComponent implements OnInit, OnDestroy {
  title = 'Product Edit';
  productId!: number;
  product!: Product;
  vendors: Vendor[] = [];
  subscription!: Subscription;

  constructor(
    private productSvc: ProductService,
    private vendorSvc: VendorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vendorSvc.list().subscribe(vs => this.vendors = vs);
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.subscription = this.productSvc.getById(this.productId).subscribe(p => this.product = p);
    });
  }

  save(): void {
    this.productSvc.update(this.product).subscribe(() => {
      this.router.navigateByUrl('/product-list');
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
