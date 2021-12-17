import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiveCratesComponent } from './receive-crates/receive-crates.component';
import { CrateDistributionComponent } from './crate-distribution/crate-distribution.component';
import { AhoRoutingModule } from './aho-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [ReceiveCratesComponent, CrateDistributionComponent],
  imports: [
    CommonModule,
    AhoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatRadioModule
  ]
})
export class AhoModule { }
