import { MatButtonModule } from '@angular/material/button';
import { AhoService } from './../services/aho.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AhoRoutingModule } from './aho-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhoFooterComponent } from './layout/aho-footer/aho-footer.component';
import { AhoHeaderComponent } from './layout/aho-header/aho-header.component';
import { AhoSidebarComponent } from './layout/aho-sidebar/aho-sidebar.component';
import { AhoLayoutComponent } from './layout/aho-layout/aho-layout.component';
import { CrateDistributionComponent } from './crate-distribution/crate-distribution.component';
import { ReceiveCrateComponent } from './receive-crate/receive-crate.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [AhoFooterComponent, AhoHeaderComponent, AhoSidebarComponent, AhoLayoutComponent, CrateDistributionComponent, ReceiveCrateComponent],
  imports: [
    CommonModule,
    AhoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule
  ],
  providers: [AhoService]
})
export class AhoModule { }
