import { Component } from '@angular/core';
import { ProductsListComponent } from "../../widgets/products-page/products-list/products-list.component";
import { ProductOverviewComponent } from "../../widgets/products-page/product-overview/product-overview.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductsListComponent, ProductOverviewComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export default class ProductsComponent {

}
