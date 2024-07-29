import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductOverviewService {
  private http: HttpClient = inject(HttpClient);

  private BASE_URL = 'https://ctrl-shop-back.vercel.app';

  getProduct(id: string) {
    return this.http.get(`${this.BASE_URL}/product/${id}`);
  }
}
