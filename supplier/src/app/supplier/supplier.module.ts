import { SupplierService } from './../services/supplier.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupplierRoutingModule } from './suply-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierLayoutComponent } from './layout/supplier-layout/supplier-layout.component';
import { SupplierHeaderComponent } from './layout/supplier-header/supplier-header.component';
import { SupplierFooterComponent } from './layout/supplier-footer/supplier-footer.component';
import { SupplierSidebarComponent } from './layout/supplier-sidebar/supplier-sidebar.component';
import { AddSupplyComponent } from './supply/add-supply/add-supply.component';
import { ViewSupplyComponent } from './supply/view-supply/view-supply.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [SupplierLayoutComponent, SupplierHeaderComponent, SupplierFooterComponent, SupplierSidebarComponent, AddSupplyComponent, ViewSupplyComponent],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  providers: [SupplierService]
})
export class SupplierModule { }
