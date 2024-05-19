import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductReportService {


  options:any = {
    responseType: 'text'
  }
  constructor(private http: HttpClient) { }

  apiUrl: string = "https://localhost:7115/api/WebReport";

  public GetReport(id: number): Observable<any>
  {
    return this.http.get<any>(this.apiUrl + '/' + id, this.options); 
  }
}
