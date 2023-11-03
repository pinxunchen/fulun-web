import { Component ,OnInit} from '@angular/core';

import { FormService } from './../../../../form.service';
import { FormBuilder  , Validators } from '@angular/forms';
import { ActivatedRoute , Router } from '@angular/router';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-taoyuan',
  templateUrl: './taoyuan.component.html',
  styleUrls: ['./taoyuan.component.css']
})

export class TaoyuanComponent implements OnInit {
  passengerName: string | null = null;
  passengerId: string | null = null;
  puAddress: string | null = null;
  dpAddress: string | null = null;
  telephone: string | null = null;
  DUID: string = "";

  form: any;

  buttonText: string = '提交';
  isSubmitting: boolean = false;


  constructor(private fb: FormBuilder ,
    private formService: FormService,
    private route: ActivatedRoute,
    private router: Router)
     {
    this.form = this.fb.group({
     PassengerName: ['', [Validators.required]],
     PassengerId: ['', [Validators.required, Validators.minLength(10)]],
     Date: ['', [Validators.required]],
     RTime: ['', [Validators.required]],
     BTime: '無回程',
     Area: '桃園',
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
    this.isSubmitting = true;
    const formData = { ...this.form.value, DUID: this.formService.DUID };
    this.formService.submitForm(formData)
      .subscribe(
        response => {
          //console.log('請求成功：', response);
          this.buttonText = '提交中...';
          const message = `<b>個案姓名</b> : ${formData.PassengerName}
          <br><b>日期</b> : ${formData.Date}
          <br><b>去程時間</b> : ${formData.RTime}
          <br><b>回程時間</b> : ${formData.BTime}
          <br><b>出發地點</b> : ${formData.PUAddress}
          <br><b>目的地點</b> : ${formData.DPAddress}`;
          this.showAlert(message);
          this.form.reset();
          // 跳轉回menu
          this.router.navigate(['/menu']);
        },
        error => {
          //console.error('請求錯誤：', error);
          this.buttonText = '提交';
        }
      );
  } else {
    const message = '請重新確認表單內容！'
    this.showFailAlert(message);
    const duidValue = this.form.get('DUID').value;
    this.buttonText = '提交';
   //console.log('DUID:', duidValue);
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

 showAlert(message: string): void {
   Swal.fire({
     title: `<b>提交成功！</b>`,
     html: `<b>${message}</b>`,
     icon: 'success',
     confirmButtonText: '確定'
   });
 }

 showFailAlert(message: string): void {
   Swal.fire({
     html: `<b>${message}</b>`,
     icon: 'error',
     confirmButtonText: '確定'
   });
 }

}
