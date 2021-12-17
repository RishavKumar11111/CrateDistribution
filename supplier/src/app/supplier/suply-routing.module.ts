import { ViewSupplyComponent } from './supply/view-supply/view-supply.component';
import { AddSupplyComponent } from './supply/add-supply/add-supply.component';
import { SupplierLayoutComponent } from './layout/supplier-layout/supplier-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
          {
            path: 'supplier',
            component: SupplierLayoutComponent,
            children: [
                    { path: "", redirectTo: "addSupply", pathMatch: "full"},
                    { path: "addSupply", component: AddSupplyComponent},
                    { path: "viewSupply", component: ViewSupplyComponent},
            ]
          } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
