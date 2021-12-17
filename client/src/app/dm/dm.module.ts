import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmReceivedCratesComponent } from './confirm-received-crates/confirm-received-crates.component';
import { DmRoutingModule } from './dm-routing.module';
import { ConfirmedListByDmComponent } from './confirmed-list-by-dm/confirmed-list-by-dm.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [ConfirmReceivedCratesComponent, ConfirmedListByDmComponent],
  imports: [
    CommonModule,
    DmRoutingModule,
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
export class DmModule { }
