import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductOverviewService } from './api/product-overview.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-overview',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './product-overview.component.html',
  styleUrl: './product-overview.component.scss'
})
export class ProductOverviewComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  private productOverviewService: ProductOverviewService = inject(ProductOverviewService);

  productId: string = '';
  product: any = [];
  images: File[] = [];
  productFormValid: boolean = false;
  // productForm!: FormGroup;

  productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
  });

  newProduct() {
    this.router.navigate(['./products'], { queryParams: { id: null } });
    // this.productId = '';
    this.product = [];
    this.productForm.reset();
  }

  saveProduct() {
    if (!this.productFormValid) {
      console.log('Form is invalid');
      return;
    }

    let productInDb
    if (this.productId) {
      this.productOverviewService.getProduct(this.productId).subscribe((product: any) => {
        productInDb = product;

        if (productInDb) {
          console.log('Product found');
        }
        else {
          if (!productInDb) {
            console.log('Product not found');
            // let newProduct: any = [];
            // newProduct.push(this.productForm.value);
            // newProduct.images.push('../../../../../public/asa.png')

            // this.productOverviewService.uploadProduct(newProduct).subscribe((product: any) => {
            //   console.log('Product uploaded successfully');
            // });
          }
        }
      });
    } else {
      console.log('мяуууууууууцйджуйцжду');

      this.productOverviewService.uploadProduct(
        this.productForm.value.name,
        this.productForm.value.category,
        this.productForm.value.price,
        this.productForm.value.description,
        this.images
      ).subscribe(
        responce => {
          console.log('Product uploaded successfully', responce);
        },
        error => {
          console.log();
        }
      );
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.productId = params['id'];
      if (this.productId || this.productId != '') {
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
