import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Product} from "../../model/product";
import {ProductService} from "../../service/product.service";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService, private authService: AuthService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
        next: data => {
          this.products = data as Product[];
        },
        error: error => {
          this.toastr.error('An error occurred while trying to fetch the products');
        }
      }
    );
  }

  deleteProduct(code: string) {
    this.productService.deleteProduct(code).subscribe({
      next: data => {
        this.toastr.info('Product deletion successful');
        this.loadProducts();
      },
      error: error => {
        this.toastr.error('Product deletion failed');
      }
    });
  }

  sellProduct(code: string) {
    this.productService.sellProduct(code).subscribe({
      next: data => {
        this.toastr.info('Product sold successfully');
        this.loadProducts();
      },
      error: error => {
        this.toastr.error('Product failed to be sold');
      }
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }


}
