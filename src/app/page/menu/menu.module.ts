import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking/booking.component';
import { MenuRoutingModule } from './menu-routing.module';
import { SearchComponent } from './search/search.component';
import { DownloadComponent } from './download/download.component';
import { QuotaComponent } from './quota/quota.component';
import { TaipeiComponent } from './booking/taipei/taipei.component';
import { NewTaipeiComponent } from './booking/new-taipei/new-taipei.component';
import { TaoyuanComponent } from './booking/taoyuan/taoyuan.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QuotaSearchComponent } from './quota/quota-search/quota-search.component';
import { QuotaCountComponent } from './quota/quota-count/quota-count.component';
import { FormsModule } from '@angular/forms';
import { QualificationsComponent } from './quota/qualifications/qualifications.component';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from 'primeng/button';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    BookingComponent,
    SearchComponent,
    DownloadComponent,
    QuotaComponent,
    TaipeiComponent,
    NewTaipeiComponent,
    TaoyuanComponent,
    QuotaSearchComponent,
    QuotaCountComponent,
    QualificationsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MenuRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatDialogModule,
    InputMaskModule,
    CalendarModule,
    MatNativeDateModule,
    ButtonModule
  ],
  exports:[
    BookingComponent,
  ]
})
export class MenuModule { }
