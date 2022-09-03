import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`/api/products`, product, {headers: this.headers});
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`/api/products`, {headers: this.headers})
  }

  getProductsBySeller(seller: string): Observable<Product[]> {
    const httpParams = new HttpParams().append('seller', seller);
    return this.http.get<Product[]>(`/api/products`, {headers: this.headers, params: httpParams});
  }

  getProductByCode(code: string): Observable<Product> {
    return this.http.get<Product>(`/api/products/${code}`, {headers: this.headers})
  }

  deleteProduct(code: string): Observable<void> {
    return this.http.delete<void>(`/api/products/${code}`, {headers: this.headers})
  }

  sellProduct(code: string): Observable<void> {
    // @ts-ignore
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const httpParams = new HttpParams().append('seller', user.username);
    return this.http.post<void>(`/api/products/${code}`, {}, {
      headers: this.headers,
      params: httpParams
    });
  }
}
