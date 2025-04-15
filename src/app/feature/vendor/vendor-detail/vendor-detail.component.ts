import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor.service';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css'],
  standalone: false
})
export class VendorDetailComponent implements OnInit, OnDestroy {
  title = 'Vendor Detail';
  vendorId!: number;
  vendor!: Vendor;
  subscription!: Subscription;

  constructor(
    private vendorSvc: VendorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.vendorId = params['id'];
      this.subscription = this.vendorSvc.getById(this.vendorId).subscribe({
        next: (v) => this.vendor = v,
        error: (err) => console.error('Error retrieving vendor:', err)
      });
    });
  }

  delete(): void {
    this.vendorSvc.delete(this.vendorId).subscribe({
      next: () => this.router.navigateByUrl('/vendor-list'),
      error: (err) => console.error('Error deleting vendor:', err)
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
