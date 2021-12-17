import { AddSupplierComponent } from './supplier/add-supplier/add-supplier.component';
import { EditSupplierDetailsComponent } from './supplier/edit-supplier-details/edit-supplier-details.component';
import { ViewSupplierListComponent } from './supplier/view-supplier-list/view-supplier-list.component';
import { ConfirmReceivedCratesComponent } from './confirm-received-crates/confirm-received-crates.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
                {path:"",redirectTo: "addSupplier",pathMatch: "full"},
                { path: "addSupplier", component: AddSupplierComponent },
                { path: "viewSupplier", component: ViewSupplierListComponent },
                { path: "updateSupplier/:userid", component: EditSupplierDetailsComponent },
                { path: "crateReceiveConfirmation", component: ConfirmReceivedCratesComponent }
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
