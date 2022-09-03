import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ProductService} from "../../service/product.service";
import {Product} from "../../model/product";

@Component({
  selector: 'app-product-registration',
  templateUrl: './product-registration.component.html',
  styleUrls: ['./product-registration.component.css']
})
export class ProductRegistrationComponent implements OnInit {

  productRegistration = {
    code: '',
    name: '',
    productType: '',
    price: 0
  };

  constructor(private productService: ProductService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  registerProduct() {
    if (this.fieldsAreFilled()) {
      const product: Product = {...this.productRegistration};
      this.productService.saveProduct(product).subscribe({
        next: (res) => {
          this.toastr.success('Product successfully added.');
          this.router.navigateByUrl('/product-list');
        },
        error: (error) => {
          this.toastr.error('Product registration failed.');
        }
      });
    }
  }

  private fieldsAreFilled(): boolean {
    return this.productRegistration.code !== ''
      && this.productRegistration.name !== ''
      && this.productRegistration.productType !== ''
      && this.productRegistration.price >= 0;
  }

}
