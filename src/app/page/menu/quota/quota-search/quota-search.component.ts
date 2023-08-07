import { Component } from '@angular/core';

import { FormService } from 'src/app/form.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-quota-search',
  templateUrl: './quota-search.component.html',
  styleUrls: ['./quota-search.component.css']
})
export class QuotaSearchComponent {
  key: string = '';

  quotas: any[] = [];
  LTCQuotaList: any[] = [];

  showEmptyKeyWarning: boolean = false;
  isLoading: boolean = false;
  showNoDataMessage = false;


  constructor(private formService: FormService) {}

  searchQuota() {
    this.quotas=[];

    //檢查輸入值
    if (this.key.trim() === '') {
      this.showEmptyKeyWarning = true;
      return;
    }

    const requestData  = {
      Key: this.key
    };

    this.isLoading = true;
    this.formService.searchQuotaService(requestData)
    .subscribe(
      response => {
        this.showEmptyKeyWarning = false;
        this.showNoDataMessage = false;

        //檢查array是否為空
        this.showNoDataMessage = this.LTCQuotaList.length === 0;
        this.quotas = response.LTCQuotaList;
        this.LTCQuotaList = response.LTCQuotaList;

        //console.log('LTCQuotaList:', response);
        //關閉spinner
        this.isLoading = false;
      },
      error => {
        //console.error('請求錯誤：', error);
        this.isLoading = false;
      }
    );
    }

    clearInputs() {
      this.quotas = [];
      this.key = '';
      this.showNoDataMessage = false;
      this.showEmptyKeyWarning = false;
    }


        //提示
        showPrompt(): void {
          Swal.fire({
            html: '<b><br>僅提供下載已請款過個案的請款表<br>新個案請聯絡Line@人員協助下載</br>',
            icon: 'info',
            confirmButtonText: '確認'
          });
        }

}

