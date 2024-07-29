import { Component, inject, OnInit } from '@angular/core';
import { ProductsListService } from './api/products-list.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {
  private router: Router = inject(Router);

  private productsList: ProductsListService = inject(ProductsListService);

  products: any = [];

  renderImages: boolean = false;

  togleImageRender() {
    this.renderImages = !this.renderImages;
  }

  setActiveProduct(id: any) {
    this.router.navigate(['./products'], { queryParams: { id: id } });
  }

  ngOnInit(): void {
    this.productsList.getProducts().subscribe((data: any) => {
      this.products = data;
      console.log(this.products);
    });
  }
}
