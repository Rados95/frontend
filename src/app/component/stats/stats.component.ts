import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {Product} from "../../model/product";
import {StatsService} from "../../service/stats.service";
import {ToastrService} from "ngx-toastr";
import {ProductService} from "../../service/product.service";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  bestSeller: User | undefined;
  bestSellerProductCodes: string[] = [];
  worstSeller: User | undefined;
  worstSellerProductCodes: string[] = [];
  mostExpensiveProduct: Product | undefined;
  cheapestProduct: Product | undefined;
  percentageOfSoldProducts: number | undefined;

  constructor(private statsService: StatsService, private productService: ProductService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.statsService.getBestSeller().subscribe({
      next: data => {
        this.bestSeller = data;
        this.productService.getProductsBySeller(this.bestSeller.username).subscribe({
          next: data => {
            this.bestSellerProductCodes = data.map((p: Product) => p.code);
          },
          error: err => {
            console.log(err);
            this.toastr.error(`An error occurred while fetching products sold by ${this.bestSeller?.username}`);
          }
        });
      },
      error: err => {
        console.log(err);
        this.toastr.error('An error occurred while fetching the best seller');
      }
    });
    this.statsService.getWorstSeller().subscribe({
      next: data => {
        this.worstSeller = data;
        this.productService.getProductsBySeller(this.worstSeller.username).subscribe({
          next: data => {
            this.worstSellerProductCodes = data.map((p: Product) => p.code);
          },
          error: err => {
            console.log(err);
            this.toastr.error(`An error occurred while fetching products sold by ${this.worstSeller?.username}`);
          }
        });
      },
      error: err => {
        console.log(err);
        this.toastr.error('An error occurred while fetching the worst seller');
      }
    });
    this.statsService.getMostExpensiveProduct().subscribe({
      next: data => {
        this.mostExpensiveProduct = data;
      },
      error: err => {
        console.log(err);
        this.toastr.error('An error occurred while fetching the most expensive product');
      }
    });
    this.statsService.getCheapestProduct().subscribe({
      next: data => {
        this.cheapestProduct = data;
      },
      error: err => {
        console.log(err);
        this.toastr.error('An error occurred while fetching the cheapest product');
      }
    });
    this.statsService.getPercentageOfSoldProducts().subscribe({
      next: data => {
        this.percentageOfSoldProducts = data;
      },
      error: err => {
        console.log(err);
        this.toastr.error('An error occurred while fetching the percentage of sold products');
      }
    });
  }

}
