import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  products: WritableSignal<any> = signal([]);

  private BASE_URL = 'https://ctrl-shop-back.vercel.app';

  getProducts() {
    this.http.get(`${this.BASE_URL}/products`).pipe().subscribe((data: any) => {
      console.log(data);
      this.products.set(data);
    })
  }
}
