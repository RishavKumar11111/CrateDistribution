import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSupplierComponent } from './supplier/add-supplier/add-supplier.component';
import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ViewSupplierListComponent } from './supplier/view-supplier-list/view-supplier-list.component';
import { ConfirmReceivedCratesByAhoComponent } from './confirm-received-crates-by-aho/confirm-received-crates-by-aho.component';
import { ConfirmedListComponent } from './confirmed-list/confirmed-list.component';
import { SupplierFormComponent } from './supplier/supplier-form/supplier-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AddAreaOfOperationComponent } from './supplier/add-area-of-operation/add-area-of-operation.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AreaOfOperationListComponent } from './supplier/area-of-operation-list/area-of-operation-list.component';
import { SelectBlocksComponent } from './supplier/select-blocks/select-blocks.component';
import { UpdateSupplierComponent } from './supplier/update-supplier/update-supplier.component';

@NgModule({
  declarations: [
    AddSupplierComponent, ViewSupplierListComponent, ConfirmReceivedCratesByAhoComponent, 
    ConfirmedListComponent, SupplierFormComponent, AddAreaOfOperationComponent, AreaOfOperationListComponent, SelectBlocksComponent, UpdateSupplierComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatStepperModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule
  ]
})
export class AdminModule { }
