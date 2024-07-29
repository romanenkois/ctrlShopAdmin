import { Component, OnInit } from '@angular/core';
import { ProductsListService } from './api/products-list.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {
  private productsList: ProductsListService = new ProductsListService();

  products: any = [];

  renderImages: boolean = false;

  togleImageRender() {
    this.renderImages = !this.renderImages;
  }

  ngOnInit(): void {
    this.productsList.getProducts().subscribe((data: any) => {
      this.products = data;
      console.log(this.products);
    });
  }
}
