import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductOverviewService } from './api/product-overview.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-overview',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './product-overview.component.html',
  styleUrl: './product-overview.component.scss'
})
export class ProductOverviewComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);

  private productOverviewService: ProductOverviewService = inject(ProductOverviewService);

  productId: string = '668c09a5c0e1256172e557a9';
  product: any = [];
  // productForm!: FormGroup;

  productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
  });

  ngOnInit() {
    if (this.productId) {
      this.productOverviewService.getProduct(this.productId).subscribe((product: any) => {
        this.product = product;
        this.productForm.patchValue(this.product);
      });
    }

    this.productForm.valueChanges.subscribe(console.log);
  }
}
