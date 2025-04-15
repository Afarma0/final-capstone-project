import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItem } from '../../../model/menu-item';
import { SystemService } from '../../../service/system.service';
import { User } from '../../../model/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: false,
})
export class MenuComponent implements OnInit, OnDestroy {
  title: string = 'FinalCapstoneProject';
  menuItems: MenuItem[] = [];
  private subscription!: Subscription;

  constructor(public sysSvc: SystemService) {}

  ngOnInit(): void {
    this.subscription = this.sysSvc.loggedInUser$.subscribe((user: User) => {
      this.menuItems = [
        new MenuItem('User', '/user-list', 'User List'),
        new MenuItem('Vendor', '/vendor-list', 'Vendor List'),
        new MenuItem('Product', '/product-list', 'Product List'),
        new MenuItem('Request', '/request-list', 'Request List'),
        new MenuItem('Login', '/user-login', 'User Login'),
      ];

      if (user?.reviewer) {
        this.menuItems.push(new MenuItem('Review', '/request-review', 'Review Requests'));
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
