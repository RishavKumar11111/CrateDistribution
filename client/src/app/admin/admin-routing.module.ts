import { LayoutComponent } from './../common/layout/layout.component';
import { AddSupplierComponent } from './supplier/add-supplier/add-supplier.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewSupplierListComponent } from './supplier/view-supplier-list/view-supplier-list.component';
import { ConfirmReceivedCratesByAhoComponent } from './confirm-received-crates-by-aho/confirm-received-crates-by-aho.component';
import { ConfirmedListComponent } from './confirmed-list/confirmed-list.component';
import { ResolveGuard } from '../auth/resolve.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    resolve: {
      isLoad: ResolveGuard
    },
    children: [
                { path:"", redirectTo: "addSupplier",pathMatch: "full"},
                { path: "addSupplier", component: AddSupplierComponent },
                { path: "viewSuppliersList", component: ViewSupplierListComponent },
                { path: "confirmReceivedCratesByAho", component: ConfirmReceivedCratesByAhoComponent },
                { path: "confirmedList", component: ConfirmedListComponent }
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
export class AdminRoutingModule { }
