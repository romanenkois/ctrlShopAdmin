import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private BASE_URL = 'https://ctrl-shop-back.vercel.app/';

  getOrders() {
    return fetch(`${this.BASE_URL}orders`).then((response) => response.json());
  }
}
