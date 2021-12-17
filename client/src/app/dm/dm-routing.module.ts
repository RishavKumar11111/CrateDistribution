import { LayoutComponent } from './../common/layout/layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmReceivedCratesComponent } from './confirm-received-crates/confirm-received-crates.component';
import { ConfirmedListComponent } from '../admin/confirmed-list/confirmed-list.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'dm',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
                { path:"",redirectTo: "confirmReceivedCrates",pathMatch: "full"},
                { path: "confirmReceivedCrates", canActivate: [AuthGuard], component: ConfirmReceivedCratesComponent },
                { path: "confirmedListByDm", canActivate: [AuthGuard], component: ConfirmedListComponent }
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
