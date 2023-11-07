import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private apiUrl = 'https://www.crowntaxi.com.tw/CTW/Service.svc/';

  DUID: string = '';

  constructor(private http: HttpClient) {}

  //表單提交
  submitForm(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json; charset=utf-8',
    });
    const httpOptions = { headers: headers };
    return this.http.post<any>(
      this.apiUrl + 'LTCAppointV2',
      formData,
      httpOptions
    );
  }

  //提交查詢交通趟紀錄
  sendData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'QueryLTCAppoint', data);
  }

  //查詢長照額度
  searchQuotaService(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'QueryLTCQuota', data);
  }

  //查詢新北長照資格
  searchQualificationsService(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'QueryLTCCase', data);
  }
}
