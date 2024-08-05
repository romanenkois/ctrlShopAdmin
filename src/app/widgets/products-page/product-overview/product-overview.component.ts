import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductOverviewService } from './api/product-overview.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { ProductsServiceService } from '../products-service.service';

@Component({
  selector: 'app-product-overview',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, NzCarouselModule ],
  templateUrl: './product-overview.component.html',
  styleUrl: './product-overview.component.scss'
})
export class ProductOverviewComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private http: HttpClient = inject(HttpClient);

  private productOverviewService: ProductOverviewService = inject(ProductOverviewService);
  private productsService: ProductsServiceService = inject(ProductsServiceService);

  productId: string = '';
  product: any = [];
  images: File[] = [];
  imageUrls: string[] = [];
  productFormValid: boolean = false;

  productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
  });

  newProduct() {
    this.router.navigate(['./products'], { queryParams: { id: null } });
    this.product = [];
    this.productForm.reset();

    this.images = [];
    this.imageUrls = [];
    this.loadImageAsFile('asa.png');
  }

  saveProduct() {
    if (!this.productFormValid) {
      console.log('Form is invalid');
      return;
    }
    if (this.productId) {
      this.saveChangedProduct();
    } else {
      this.saveNewProduct();
    }
  }

  saveNewProduct() {
    if (this.images.length < 1) {
      this.loadImageAsFile('asa.png');
    };

    this.productOverviewService.uploadProduct(
      this.productForm.value.name,
      this.productForm.value.category,
      this.productForm.value.price,
      this.productForm.value.description,
      this.images
    ).subscribe(
      responce => {
        console.log('Product uploaded successfully', responce);
        this.productsService.getProducts();

      },
      error => {
        console.log('Error uploading product', error);
      }
    );
  }

  saveChangedProduct() {
    this.productOverviewService.getProduct(this.productId).subscribe((product: any) => {
      if (product) {
        console.log('Product found', product);
      } else {
        console.log('Product not found');
      }
    });
  }

  uploadImage(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0]; // You can handle multiple files if needed
      this.images.push(file);
      console.log('Image uploaded', file);
      console.log('Images', this.images);
    }
  }

  removeImage(input: any) {
    console.log('Remove image', input);
  }

  deleteProduct() {
    this.productOverviewService.deleteProduct(this.productId).subscribe(
      responce => {
      console.log('Product deleted successfully', responce);
      this.productsService.getProducts();
      this.router.navigate(['./products']);
    })
  }

  // Used to load image from assets folder, used to load some default image
  loadImageAsFile(imagePath: string) {
    this.http.get(imagePath, { responseType: 'blob' }).subscribe(blob => {
      const fileName = imagePath.split('/').pop() || 'asa.png';
      const file = new File([blob], fileName, { type: blob.type });
      this.images.push(file);
      this.imageUrls.push(URL.createObjectURL(file));
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log('Product ID:', this.productId);
      this.productId = params['id'];
      if (this.productId !== undefined && this.productId !== null && this.productId !== '') {
        this.productOverviewService.getProduct(this.productId).subscribe((product: any) => {
          this.product = product;
          this.productForm.patchValue(this.product);
        });
      } else {
        this.product = [];
      }
    });

    this.productForm.valueChanges.subscribe(() => {
      this.productFormValid = this.productForm.valid;
    });
  }
}
