import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {User} from "../../model/user";
import {ToastrService} from "ngx-toastr";
import {ProductService} from "../../service/product.service";
import {Product} from "../../model/product";

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  user: User | undefined;
  productCodes: string[] = [];

  constructor(private userService: UserService, private productService: ProductService,
              private route: ActivatedRoute, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const username = params.get('username');
      if (username) {
        this.userService.getUserByUsername(username).subscribe({
          next: data => {
            this.user = data;
            this.productService.getProductsBySeller(username).subscribe({
              next: data => {
                this.productCodes = data.map((p: Product) => p.code);
              },
              error: err => {
                console.log(err);
                this.toastr.error(`An error occurred while fetching products sold by ${this.user?.username}`);
              }
            });
          },
          error: err => {
            console.log(err);
            this.toastr.error('An error occurred while fetching user data');
          }
        });
      }
    })
  }

}
