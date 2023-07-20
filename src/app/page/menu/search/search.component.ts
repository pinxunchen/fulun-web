import { Component   } from '@angular/core';

import { FormService } from 'src/app/form.service';
import { Router , NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  duid: string = '61376bbcc3298933'

  appointments: any[] = [];
  pid: string = '';
  pname: string = '';

  isLoading: boolean = false;

  showNoData: boolean = false;
  searchText: string = '';
  ascendingOrder: boolean = false;


  constructor(private formService: FormService ,private router: Router) {}

  //發送Post請求
  sendDataToAPI() {
    this.appointments = [];
    this.isLoading = true;

    const data = {
      DUID: this.duid,
      PID: this.pid,
      PName: this.pname
    };

    this.formService.sendData(data).subscribe(
      response => {
        //console.log('請求成功：', response);
        this.appointments = response.Appoints.filter((appointment: any) => appointment.DUID === this.duid);
        this.showNoData = this.appointments.length === 0;
        this.searchText = this.pid ?
        `以下是身分證： ${this.pid} 的訂車紀錄查詢結果， 共 ${this.appointments.length} 筆資料` :
        `以下是姓名：${this.pname} 的訂車紀錄查詢結果，共 ${this.appointments.length} 筆資料`;
        this.isLoading = false;
      },
      error => {
        //console.error('請求錯誤：', error);
        this.isLoading = false;
      }
    );
  }


  //清除
  clearInputs() {
    this.pid = '';
    this.pname = '';
    this.appointments = [];
    this.showNoData = false;
  }


  //日期排列
  sortAppointments() {
    this.appointments.sort((a, b) => {
      const dateA = new Date(a.Date);
      const dateB = new Date(b.Date);

      if (this.ascendingOrder) {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });

    this.ascendingOrder = !this.ascendingOrder;
    };


    //傳遞APPOINT到地區頁面
    navigateToAreaComponent(appointment: any) {
      const queryParams = {
        passengerName: appointment.PassengerName,
        passengerId: appointment.PassengerId,
        puAddress: appointment.PUAddress,
        dpAddress: appointment.DPAddress,
        telephone: appointment.Telephone
      };

      if (appointment.Area === '台北') {
        this.router.navigate(['menu/booking/taipei'], { queryParams });
      } else if (appointment.Area === '新北') {
        this.router.navigate(['menu/booking/newTaipei'], { queryParams });
      } else if (appointment.Area === '桃園') {
        this.router.navigate(['menu/booking/taoyuan'], { queryParams });
      }
    }


    //提示
    showPrompt() {
      alert('請輸入個案 "身分證" 或 "姓名" 後點擊查詢，直接點擊查詢可查看您的全部趟次');
    }
}

