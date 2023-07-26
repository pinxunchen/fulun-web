import { Component ,OnInit} from '@angular/core';

import { FormService } from './../../../../form.service';
import { FormBuilder  , Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-taipei',
  templateUrl: './new-taipei.component.html',
  styleUrls: ['./new-taipei.component.css']
})
export class NewTaipeiComponent implements OnInit {
  passengerName: string | null = null;
  passengerId: string | null = null;
  puAddress: string | null = null;
  dpAddress: string | null = null;
  telephone: string | null = null;
  DUID: string = "";

  form: any;

  constructor(private fb: FormBuilder , private formService: FormService,private route: ActivatedRoute) {
    this.form = this.fb.group({
      PassengerName: ['', [Validators.required]],
      PassengerId: ['', [Validators.required, Validators.minLength(10)]],
      Date: ['', [Validators.required]],
      RTime: ['', [Validators.required]],
      BTime: '無回程',
      Area: '新北',
      DUID: [this.formService.DUID, [Validators.required]],
      PUAddress: ['', [Validators.required]],
      DPAddress: ['', [Validators.required]],
      Telephone: ['', [Validators.required, Validators.minLength(10)]],
      Remark: '',
      Option: ['爬梯機+交通', [Validators.required]],
    });
  }


  onSubmit(f:any){
    if (f.valid) {
      //const duidValue = this.form.get('DUID').value;
      const formData = { ...this.form.value, DUID: this.formService.DUID };
      this.formService.submitForm(formData)
        .subscribe(
          response => {
            //console.log('請求成功：', response);
            const message = `表單成功提交！\n個案姓名 : ${formData.PassengerName}\n日期 : ${formData.Date}\n去程時間 : ${formData.RTime}\n回程時間 : ${formData.BTime}\n出發地點 : ${formData.PUAddress}\n目的地點 : ${formData.DPAddress}`;
            alert(message);
            this.form.reset();

            // 跳轉回menu
            //this.router.navigate(['/menu']);
          },
          error => {
            console.error('請求錯誤：', error);

          }
        );
    } else {
     alert('請重新確認表單內容！');
     const duidValue = this.form.get('DUID').value;
     console.log('DUID:', duidValue); // 確認是否有值被正確設置

    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.passengerName = params['passengerName'] || null;
      this.passengerId = params['passengerId'] || null;
      this.puAddress = params['puAddress'] || null;
      this.dpAddress = params['dpAddress'] || null;
      this.telephone = params['telephone'] || null;
    });




  }
}
