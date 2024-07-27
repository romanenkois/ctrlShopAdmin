import { Component } from '@angular/core';
import { OrdersListComponent } from "../../widgets/orders-page/orders-list/orders-list.component";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [OrdersListComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export default class OrdersComponent {

}
