import { SupplyToBlockComponent } from './supply-to-block/supply-to-block.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../common/layout/layout.component';
import { ViewSupplyListComponent } from './view-supply-list/view-supply-list.component';

const routes: Routes = [
          {
            path: 'supplier',
            component: LayoutComponent,
            children: [
                    { path: "", redirectTo: "supplytoBlock", pathMatch: "full"},
                    { path: "supplytoBlock", component: SupplyToBlockComponent},
                    { path: "viewSupplyList", component: ViewSupplyListComponent},
            ]
          } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
