import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from './api/orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss'
})
export class OrdersListComponent implements OnInit {
  private ordersService: OrdersService = inject(OrdersService);

  orders: any = [];

  ngOnInit() {
    this.ordersService.getOrders().then((orders) => {
      this.orders = orders;
      console.log('Orders:', orders);
    });
  }
}
