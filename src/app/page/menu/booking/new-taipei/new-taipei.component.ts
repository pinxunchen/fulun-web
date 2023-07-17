import { Component } from '@angular/core';

import { FormService } from './../../../../form.service';
import { FormBuilder  , Validators } from '@angular/forms';

@Component({
  selector: 'app-new-taipei',
  templateUrl: './new-taipei.component.html',
  styleUrls: ['./new-taipei.component.css']
})
export class NewTaipeiComponent {
  form: any;

  constructor(private fb: FormBuilder , private formService: FormService) {
    this.form = this.fb.group({
      PassengerName: ['', [Validators.required]],
      PassengerId: ['', [Validators.required, Validators.minLength(10)]],
      Date: ['', [Validators.required]],
      RTime: ['', [Validators.required]],
      BTime: '無回程',
      Area: '台北',
      DUID: '61376bbcc3298933',
      PUAddress: ['', [Validators.required]],
      DPAddress: ['', [Validators.required]],
      Telephone: ['', [Validators.required, Validators.minLength(10)]],
      Remark: '',
      Option: ['爬梯機+交通', [Validators.required]],
    });
  }


  onSubmit(f:any){
    if (f.valid) {
      const formData = this.form.value;
      this.formService.submitForm(formData)
        .subscribe(
          response => {
            console.log('請求成功：', response);

            const message = `表單成功提交！\n個案姓名 : ${formData.PassengerName}\n日期 : ${formData.Date}\n去程時間 : ${formData.RTime}\n回程時間 : ${formData.BTime}\n出發地點 : ${formData.PUAddress}\n目的地點 : ${formData.DPAddress}`;
            alert(message);
            this.form.reset();
          },
          error => {
            console.error('請求錯誤：', error);
          }
        );
    } else {
     alert('請重新確認表單內容！');
    }
  }



}
