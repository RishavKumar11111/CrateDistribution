import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplyToBlockComponent } from './supply-to-block/supply-to-block.component';
import { ViewSupplyListComponent } from './view-supply-list/view-supply-list.component';
import { SupplierRoutingModule } from './suply-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [SupplyToBlockComponent, ViewSupplyListComponent],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule
  ]
})
export class SupplierModule { }
