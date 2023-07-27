import { Component } from '@angular/core';

import { FormService } from 'src/app/form.service';
import { Router } from '@angular/router';

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


  constructor(private formService: FormService, private router: Router) {}

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
        this.splitTelephones = this.qualifications[0]?.Telephone ? this.qualifications[0].Telephone.split('\n') : [];


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

  //傳遞資料到newTaipei頁面
  passDataToNewTaipeiComponent(qualification: any) {
    this.router.navigate(['/menu/booking/newTaipei'], {
      queryParams: {
        passengerName: qualification.PassengerName,
        passengerId: qualification.PassengerId,
        puAddress: qualification.Contact,
      }
    });
  }

  clearInputs() {
    this.qualifications = [];
    this.key = '';
    this.showNoDataMessage = false;
    this.showEmptyKeyWarning = false;
    this.isLoading = false;
    }
}
