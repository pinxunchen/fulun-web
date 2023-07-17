import { Component , Inject  } from '@angular/core';

import { FormService } from 'src/app/form.service';



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

  showNoData: boolean = false;
  searchText: string = '';

  constructor(@Inject(FormService) private formService: FormService) {}

  sendDataToAPI() {
    const data = {
      DUID: this.duid,
      PID: this.pid,
      PName: this.pname
    };

    this.formService.sendData(data).subscribe(
      response => {
        console.log('請求成功：', response);
        this.appointments = response.Appoints.filter((appointment: any) => appointment.DUID === this.duid);
        this.showNoData = this.appointments.length === 0;

        this.searchText = this.pid ? `以下是${this.pid}的訂車紀錄查詢結果，共 ${this.appointments.length} 筆資料` : `以下是 ${this.pname} 的訂車紀錄查詢結果，共 ${this.appointments.length} 筆資料`;
      },
      error => {
        console.error('請求錯誤：', error);
      }
    );
  }

  clearInputs() {
    this.pid = '';
    this.pname = '';
  }


  sortAppointments() {
    this.appointments.sort((a, b) => {
      const dateA = new Date(a.Date);
      const dateB = new Date(b.Date);

      return dateB.getTime() - dateA.getTime();
    });
  }
}
