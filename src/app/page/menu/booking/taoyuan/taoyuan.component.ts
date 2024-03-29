import { Component, OnInit } from '@angular/core';
import { FormService } from './../../../../form.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-taoyuan',
  templateUrl: './taoyuan.component.html',
  styleUrls: ['./taoyuan.component.css'],
})
export class TaoyuanComponent implements OnInit {
  passengerName: string | null = null;
  passengerId: string | null = null;
  puAddress: string | null = null;
  dpAddress: string | null = null;
  telephone: string | null = null;
  DUID: string = '';
  form: any;
  buttonText: string = '提交';
  isSubmitting: boolean = false;
  isLoading: boolean = false;
  ch: any;

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private primengConfig: PrimeNGConfig
  ) {
    this.primengConfig.setTranslation({
      firstDayOfWeek: 0,
      dayNames: ['日', '一', '二', '三', '四', '五', '六'],
      dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
      dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
      monthNames: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
      ],
      monthNamesShort: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
      ],
      today: '今天',
      clear: '清除',
      dateFormat: 'yy-mm-dd',
      weekHeader: 'Wk',
    });

    this.form = this.fb.group({
      PassengerName: ['', [Validators.required]],
      PassengerId: ['', [Validators.required, Validators.minLength(10)]],
      Dates: ['', [Validators.required]],
      RTime: ['', [Validators.required]],
      BTime: [''],
      Area: '桃園',
      DUID: [this.formService.DUID, [Validators.required]],
      PUAddress: ['', [Validators.required]],
      DPAddress: ['', [Validators.required]],
      Telephone: ['', [Validators.required, Validators.minLength(10)]],
      Remark: '',
      Option: ['爬梯機+交通', [Validators.required]],
    });
  }

  onSubmit(f: any) {
    this.isLoading = true;
    if (f.valid) {
      this.isSubmitting = true;
      const formData = { ...this.form.value, DUID: this.formService.DUID };
      formData.RTime = this.formatTime(formData.RTime as Date);
      formData.BTime = this.formatTime(formData.BTime as Date);
      formData.Dates = this.formatDates(formData.Dates as Date[]);
      this.formService.submitForm(formData).subscribe(
        (response) => {
          //console.log('請求成功：', formData);
          this.buttonText = '提交中...';
          const message = `<b>個案姓名</b> : ${formData.PassengerName}
           <br><b>日期</b> : ${formData.Dates}
           <br><b>去程時間</b> : ${formData.RTime}
           <br><b>回程時間</b> : ${formData.BTime}
           <br><b>出發地點</b> : ${formData.PUAddress}
           <br><b>目的地點</b> : ${formData.DPAddress}`;
          this.showAlert(message);
          this.form.reset();
          this.router.navigate(['/menu']);
          this.isLoading = false;
        },
        (error) => {
          //console.error('請求錯誤：', formData);
          this.buttonText = '提交';
          this.isSubmitting = false;
          this.isLoading = false;
        }
      );
    } else {
      const message = '請重新確認表單內容！';
      this.showFailAlert(message);
      this.buttonText = '提交';
      this.isSubmitting = false;
      this.isLoading = false;
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.passengerName = params['passengerName'] || null;
      this.passengerId = params['passengerId'] || null;
      this.puAddress = params['puAddress'] || null;
      this.dpAddress = params['dpAddress'] || null;
      this.telephone = params['telephone'] || null;
    });
  }

  showAlert(message: string): void {
    Swal.fire({
      title: `<b>提交成功！</b>`,
      html: `<b>${message}</b>`,
      icon: 'success',
      confirmButtonText: '確定',
    });
  }

  showFailAlert(message: string): void {
    Swal.fire({
      html: `<b>${message}</b>`,
      icon: 'error',
      confirmButtonText: '確定',
    });
  }

  //檢查回程時間是否有填寫
  formatTime(date: Date | null): string {
    if (date) {
      return this.datePipe.transform(date, 'HH:mm') || '';
    } else {
      return '無回程';
    }
  }

  //轉換日期格式
  formatDate(date: string | null): string {
    if (date) {
      return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
    } else {
      return '';
    }
  }

  //設定回程初始時間
  setInitialTime() {
    const defaultTime = new Date();
    defaultTime.setHours(13, 0, 0, 0);
    this.form.get('BTime').setValue(defaultTime);
  }

  //設定去程初始時間
  setInitialTime2() {
    const defaultTime = new Date();
    defaultTime.setHours(10, 0, 0, 0);
    this.form.get('RTime').setValue(defaultTime);
  }

  //檢查是否有多天日期
  formatDates(dates: Date[] | null): string {
    if (dates && dates.length > 0) {
      const formattedDates = dates.map((date) =>
        this.datePipe.transform(date, 'yyyy-MM-dd')
      );
      return dates
        .map((date) => this.datePipe.transform(date, 'yyyy-MM-dd') || '')
        .join(', ');
    } else {
      return '';
    }
  }
}
