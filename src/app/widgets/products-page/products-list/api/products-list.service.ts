import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsListService {
  private http: HttpClient = inject(HttpClient);

  private BASE_URL = 'https://ctrl-shop-back.vercel.app';

  getProducts() {
    return this.http.get(`${this.BASE_URL}/products`);
  }
}
