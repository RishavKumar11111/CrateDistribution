import { AdminService } from './../services/admin.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AddsupplierComponent } from './addsupplier/addsupplier.component';
import { ViewSupplierComponent } from './view-supplier/view-supplier.component';
import { UpdateSuplierComponent } from './update-suplier/update-suplier.component';
import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AdminHeaderComponent } from './layout/admin-header/admin-header.component';
import { AdminFooterComponent } from './layout/admin-footer/admin-footer.component';
import { AdminSidebarComponent } from './layout/admin-sidebar/admin-sidebar.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmReceivedCratesComponent } from './confirm-received-crates/confirm-received-crates.component';
import { ViewSupplierListComponent } from './supplier/view-supplier-list/view-supplier-list.component';
import { SupplierFormComponent } from './supplier/supplier-form/supplier-form.component';
import { EditSupplierDetailsComponent } from './supplier/edit-supplier-details/edit-supplier-details.component';
import { AddSupplierComponent } from './supplier/add-supplier/add-supplier.component';
import { AddAreaOfOperationComponent } from './supplier/add-area-of-operation/add-area-of-operation.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatSelectModule } from '@angular/material/select';
// import { MatOptionModule } from '@angular/material/core';

@NgModule({
  declarations: [AdminHeaderComponent,
    AdminFooterComponent, 
    AdminSidebarComponent,
    AddsupplierComponent,
    ViewSupplierComponent, 
    UpdateSuplierComponent,
    AdminLayoutComponent,
    ConfirmReceivedCratesComponent,
    ViewSupplierListComponent,
    SupplierFormComponent,
    EditSupplierDetailsComponent,
    AddSupplierComponent,
    AddAreaOfOperationComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminRoutingModule,
    RouterModule,
    Ng2SearchPipeModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatStepperModule,
    MatButtonModule,
    MatCheckboxModule
    // MatInputModule
    // MatFormFieldModule,
    // MatSelectModule,
    // MatOptionModule
  ],
  providers: [AdminService],
  exports: [],
})
export class AdminModule { }
