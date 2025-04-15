import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css'],
  standalone: false
})
export class VendorListComponent implements OnInit, OnDestroy {
  title = 'Vendor List';
  vendors: Vendor[] = [];
  subscription!: Subscription;

  constructor(private vendorSvc: VendorService) {}

  ngOnInit(): void {
    this.subscription = this.vendorSvc.list().subscribe(data => {
      this.vendors = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
