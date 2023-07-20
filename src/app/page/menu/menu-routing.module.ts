import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { SearchComponent } from './search/search.component';
import { DownloadComponent } from './download/download.component';
import { QuotaComponent } from './quota/quota.component';
import { TaipeiComponent } from './booking/taipei/taipei.component';
import { NewTaipeiComponent } from './booking/new-taipei/new-taipei.component';
import { TaoyuanComponent } from './booking/taoyuan/taoyuan.component';
import { QuotaCountComponent } from './quota/quota-count/quota-count.component';
import { QualificationsComponent } from './quota/qualifications/qualifications.component';
import { QuotaSearchComponent } from './quota/quota-search/quota-search.component';



const routes: Routes = [
  {
    path:'menu/booking',
    component: BookingComponent
  },
  {
    path:'menu/booking/taipei',
    component: TaipeiComponent
  },
  {
    path:'menu/booking/newTaipei',
    component: NewTaipeiComponent
  },
  {
    path:'menu/booking/taoyuan',
    component: TaoyuanComponent
  },
  {
    path:'menu/search',
    component: SearchComponent
  },
  {
    path:'menu/download',
    component: DownloadComponent
  },
  {
    path:'menu/quota',
    component: QuotaComponent
  },
  {
    path:'menu/quota/quota-count',
    component: QuotaCountComponent
  },
  {
    path:'menu/quota/qualifications',
    component: QualificationsComponent,
  },
  {
    path:'menu/quota/quota-search',
    component: QuotaSearchComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class MenuRoutingModule { }
