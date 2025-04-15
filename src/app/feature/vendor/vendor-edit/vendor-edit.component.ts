import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor.service';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css'],
  standalone: false
})
export class VendorEditComponent implements OnInit, OnDestroy {
  title = 'Vendor Edit';
  vendorId!: number;
  vendor!: Vendor;
  states: string[] = ['OH', 'KY', 'IN', 'CA', 'NY', 'TX', 'FL'];
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

  save(): void {
    this.vendorSvc.update(this.vendor).subscribe({
      next: () => this.router.navigateByUrl('/vendor-list'),
      error: (err) => console.error('Error updating vendor:', err)
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
