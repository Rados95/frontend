import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Product} from "../model/product";
import {Observable} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  public headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  getBestSeller(): Observable<User> {
    return this.http.get<User>(`/api/stats/best-seller`, {headers: this.headers});
  }

  getWorstSeller(): Observable<User> {
    return this.http.get<User>(`/api/stats/worst-seller`, {headers: this.headers});
  }

  getMostExpensiveProduct(): Observable<Product> {
    return this.http.get<Product>(`/api/stats/most-expensive-product`, {headers: this.headers});
  }

  getCheapestProduct(): Observable<Product> {
    return this.http.get<Product>(`/api/stats/cheapest-product`, {headers: this.headers});
  }

  getPercentageOfSoldProducts(): Observable<number> {
    return this.http.get<number>(`/api/stats/percentage-of-sold-products`, {headers: this.headers});
  }

}
