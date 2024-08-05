import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductsServiceService } from '../products-service.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {
  private router: Router = inject(Router);

  // private productsList: ProductsListService = inject(ProductsListService);
  private productsService: ProductsServiceService = inject(ProductsServiceService);

  products = computed(() => this.productsService.products());

  renderImages: boolean = false;

  togleImageRender() {
    this.renderImages = !this.renderImages;
  }

  setActiveProduct(id: any) {
    this.router.navigate(['./products'], { queryParams: { id: id } });
  }








  ngOnInit(): void {
    this.productsService.getProducts();

    // this.productsList.getProducts().subscribe((data: any) => {
    //   this.products = data;
    //   console.log(this.products);
    // });
  }
}
