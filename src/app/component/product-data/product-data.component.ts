import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Product} from "../../model/product";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.css']
})
export class ProductDataComponent implements OnInit {

  product: Product | undefined;

  constructor(private productService: ProductService, private authService: AuthService,
              private route: ActivatedRoute, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const code = params.get('code');
      if (code) {
        this.productService.getProductByCode(code).subscribe({
          next: data => {
            this.product = data;
          },
          error: err => {
            console.log(err);
            this.toastr.error('An error occurred while fetching product data');
          }
        });
      }
    })
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
