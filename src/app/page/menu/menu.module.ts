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
    MenuRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    BookingComponent,
  ]
})
export class MenuModule { }
