import { Component   } from '@angular/core';

import { FormService } from 'src/app/form.service';
import { Router , ActivatedRoute } from '@angular/router';


import Swal from 'sweetalert2';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  duid: string = '';
  appointments: any[] = [];
  pid: string = '';
  pname: string = '';

  isLoading: boolean = false;
  showNoData: boolean = false;
  searchText: string = '';
  ascendingOrder: boolean = false;

  startDate: string = '';
  endDate: string = '';
  showDateFilter: boolean = false;
  originalAppointments: any[] = [];


  constructor(
    private formService: FormService ,
    private router: Router,
    private route: ActivatedRoute) {
    //this.duid = this.route.snapshot.params['duid'] || '';
  }

  //發送Post請求
  sendDataToAPI() {
    this.appointments = [];
    this.isLoading = true;

    const data = {
      DUID: this.formService.DUID,
      PID: this.pid,
      PName: this.pname
    };

    this.formService.sendData(data).subscribe(
      response => {
        //console.log('請求成功：', response);
        this.appointments = response.Appoints.filter((appointment: any) => appointment.DUID === this.formService.DUID);
        this.showNoData = this.appointments.length === 0;
        this.searchText = this.pid ?
        `以下是您的所有訂車紀錄查詢結果， 共 ${this.appointments.length} 筆資料` :
        `以下是您的所有訂車紀錄查詢結果， 共 ${this.appointments.length} 筆資料` ;
        //將原始資料存到originalAppointments
        this.originalAppointments = response.Appoints.filter((appointment: any) => appointment.DUID === this.formService.DUID);
        this.appointments = this.originalAppointments;
        this.updateSearchText();
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
    this.startDate = '';
    this.endDate = '';
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
    showPrompt(): void {
      Swal.fire({
        html: '<b>請輸入個案 "身分證" 或 "姓名" 後點擊查詢，<br>直接點擊查詢可查看您的全部趟次</br>',
        icon: 'info',
        confirmButtonText: '確認'
      });
    }


    // 新增filterAppointments函式
    filterAppointments() {
      if (this.startDate && this.endDate) {
        this.appointments = this.originalAppointments.filter((appointment: any) => {
          const appointmentDate = this.parseApiDate(appointment.Date);
          const startDate = new Date(this.startDate);
          const endDate = new Date(this.endDate);
          return appointmentDate >= startDate && appointmentDate <= endDate;
        });
      } else {
        this.appointments = this.originalAppointments;
      }

      // 判斷篩選後的筆數是否為 0
      this.showNoData = this.appointments.length === 0;

      this.updateSearchText();
    }


     //按篩選才執行
    onFilterButtonClick() {
        this.filterAppointments();
        this.showDateFilter = false;
      }



    //將api傳回的date格式轉換成語input相同
    parseApiDate(apiDate: string): Date {
      const [month, day] = apiDate.split('/');
      const currentYear = new Date().getFullYear();
      return new Date(`${currentYear}-${month}-${day}`);
    }

    //篩選後顯示的筆數
    getFilteredAppointmentCount(): number {
      return this.appointments.length;
    }


    //更新筆數
    updateSearchText() {
      if (this.pid) {
        this.searchText = `以下是您的所有訂車紀錄查詢結果， 共 ${this.getFilteredAppointmentCount()} 筆資料`;
      } else if (this.startDate && this.endDate) {
        this.searchText = `以下是您 ${this.startDate} 到 ${this.endDate}的訂車紀錄查詢結果， 共 ${this.getFilteredAppointmentCount()} 筆資料`;
      } else {
        this.searchText = `以下是您的所有訂車紀錄查詢結果， 共 ${this.getFilteredAppointmentCount()} 筆資料`;
      }
    }


    toggleDateFilter() {
      this.showDateFilter = !this.showDateFilter;
    }

}
