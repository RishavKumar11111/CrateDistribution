import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { DmService } from './../services/dm.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DmHeaderComponent } from './layout/dm-header/dm-header.component';
import { DmFooterComponent } from './layout/dm-footer/dm-footer.component';
import { DmSidebarComponent } from './layout/dm-sidebar/dm-sidebar.component';
import { DmLayoutComponent } from './layout/dm-layout/dm-layout.component';
import { DmRoutingModule } from './dm-routing.module';
import { ConfirmWorkorderComponent } from './confirm-workorder/confirm-workorder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [DmHeaderComponent, DmFooterComponent, DmSidebarComponent, DmLayoutComponent, ConfirmWorkorderComponent],
  imports: [
    CommonModule,
    DmRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  providers: [DmService]
})
export class DmModule { }
