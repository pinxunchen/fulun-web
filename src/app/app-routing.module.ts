import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './page/menu/booking/booking.component';
import { MenuComponent } from './page/menu/menu.component';
import { TaipeiComponent } from './page/menu/booking/taipei/taipei.component';
import { NewTaipeiComponent } from './page/menu/booking/new-taipei/new-taipei.component';
import { TaoyuanComponent } from './page/menu/booking/taoyuan/taoyuan.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/menu',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'menu/booking/taipei',
    component: TaipeiComponent
  },
  {
    path: 'newTaipei',
    component: NewTaipeiComponent
  },
  {
    path: 'taoyuan',
    component: TaoyuanComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
