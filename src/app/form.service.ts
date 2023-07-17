import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FormService {
  private apiUrl = 'https://www.crowntaxi.com.tw/CTW/Service.svc/';

  constructor(private http: HttpClient) { }



//表單提交
  submitForm(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'Accept': 'application/json; charset=utf-8'});
    const httpOptions = { headers: headers };

    return this.http.post<any>(this.apiUrl+'LTCAppoint', formData, httpOptions);
  }

}
