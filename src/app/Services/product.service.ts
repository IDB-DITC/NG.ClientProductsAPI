import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategory } from '../Models/product-category';
import { Product } from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  apiUrl: string = "https://localhost:7115/ProductCategories";

  public GetProducts(): Observable<ProductCategory[]>
  {
    return this.http.get<ProductCategory[]> (this.apiUrl);
  }
  public GetProduct(id: number): Observable<ProductCategory>
  {
    return this.http.get<ProductCategory>(this.apiUrl + '/' + id); 
  }
  public SaveProduct(products: any): Observable<any>
  {
    return this.http.post(this.apiUrl, products);
  }
  public UpdateProduct(products: ProductCategory): Observable<ProductCategory>
  {
    return this.http.put<ProductCategory>(this.apiUrl + '/' + products.productCategoryID, ProductCategory);
  }
  public DeleteProduct(id: any): Observable<any>
  {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
