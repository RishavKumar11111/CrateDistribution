import { ConfirmWorkorderComponent } from './confirm-workorder/confirm-workorder.component';
import { DmLayoutComponent } from './layout/dm-layout/dm-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dm',
    component: DmLayoutComponent,
    children: [
                { path:"",redirectTo: "confirmReceive",pathMatch: "full"},
                { path: "confirmReceive", component: ConfirmWorkorderComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class DmRoutingModule { }
