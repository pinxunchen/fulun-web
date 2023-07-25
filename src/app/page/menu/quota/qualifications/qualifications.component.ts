import { Component } from '@angular/core';

import { FormService } from 'src/app/form.service';


@Component({
  selector: 'app-qualifications',
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.css']
})


export class QualificationsComponent {
  key: string = '';

  qualifications: any[] = [];
  LTCCaseList: any[] = [];
  splitTelephones: string[] = [];

  showEmptyKeyWarning: boolean = false;
  isLoading: boolean = false;
  showNoDataMessage = false;


  constructor(private formService: FormService) {}

  searchQuota() {
    this.qualifications=[];

    //檢查輸入值
    if (this.key.trim() === '') {
      this.showEmptyKeyWarning = true;
      return;
    }

    const requestData  = {
      Key: this.key
    };

    this.isLoading = true;
    this.formService.searchQualificationsService(requestData)
    .subscribe(
      response => {
        this.showEmptyKeyWarning = false;
        this.showNoDataMessage = false;

        //檢查array是否為空
        this.showNoDataMessage = this.LTCCaseList.length === 0;
        this.qualifications = response.LTCCaseList;
        this.LTCCaseList = response.LTCCaseList;
        this.splitTelephones = this.qualifications[0].Telephone.split('\n');

        //console.log('LTCCaseList:', response);
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
      this.qualifications = [];
      this.key = '';
      this.showNoDataMessage = false;
      this.showEmptyKeyWarning = false;
    }
}
