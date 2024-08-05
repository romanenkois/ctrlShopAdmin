import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private http: HttpClient = inject(HttpClient);

  images: WritableSignal<any> = signal([]);

  private BASE_URL = 'https://ctrl-shop-back.vercel.app';
  // private BASE_URL = 'http://localhost:3000';

  // constructor() { this.getImages()}

  getImagesId() {
    console.log('get images');
    this.http.get(`${this.BASE_URL}/imagesId`).pipe().subscribe((data: any) => {
      let newImages: any = [];
      data.forEach((element: any) => {
        newImages.push(`${this.BASE_URL}/image/${element}`);
      });
      this.images.set(newImages);
    })
  }
}
