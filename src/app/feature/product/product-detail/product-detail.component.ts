import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  standalone: false
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  title = 'Product Detail';
  product!: Product;
  productId!: number;
  subscription!: Subscription;

  constructor(
    private productSvc: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.subscription = this.productSvc.getById(this.productId).subscribe(p => this.product = p);
    });
  }

  delete(): void {
    this.productSvc.delete(this.productId).subscribe(() => {
      this.router.navigateByUrl('/product-list');
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
