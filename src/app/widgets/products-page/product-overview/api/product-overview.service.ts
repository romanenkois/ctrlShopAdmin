import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductOverviewService {
  private http: HttpClient = inject(HttpClient);

  // private BASE_URL = 'https://ctrl-shop-back.vercel.app';
  private BASE_URL = 'http://localhost:3000';

  getProduct(id: string) {
    return this.http.get(`${this.BASE_URL}/product/${id}`);
  }

  updateProduct(id: string, product: any) {
    throw new Error('Method not implemented.');
  }

  uploadProduct(
    name: string,
    category: string,
    price: string,
    description: string,
    images: File[]
  ) {
    const formData: FormData = new FormData();

    formData.append('name', name);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('description', description);

    Array.from(images).forEach((image: any) => {
      formData.append('images', image, image.name);
    });

    const headers = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data' // Note: HttpClient will set the correct headers automatically
    });

    return this.http.post(`${this.BASE_URL}/product`, formData, { headers });
  }
}
