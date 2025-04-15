import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor.service';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css'],
  standalone: false
})
export class VendorCreateComponent implements OnInit, OnDestroy {
  title = 'Vendor Create';
  newVendor: Vendor = new Vendor();
  states: string[] = ['OH', 'KY', 'IN', 'CA', 'NY', 'TX', 'FL']; // Customize as needed
  subscription!: Subscription;

  constructor(private vendorSvc: VendorService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  addVendor(): void {
    this.subscription = this.vendorSvc.add(this.newVendor).subscribe(() => {
      this.router.navigateByUrl('/vendor-list');
    });
  }
}
