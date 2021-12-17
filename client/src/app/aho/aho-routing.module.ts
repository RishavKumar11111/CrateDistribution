import { LayoutComponent } from './../common/layout/layout.component';
import { AuthGuard } from './../auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrateDistributionComponent } from './crate-distribution/crate-distribution.component';
import { ReceiveCratesComponent } from './receive-crates/receive-crates.component';

const routes: Routes = [
            {
              path: 'aho',
              component: LayoutComponent,
              canActivate: [AuthGuard],
              children: [
                          { path: "", redirectTo: "receiveCrates", pathMatch: "full", canActivate: [AuthGuard] },
                          { path: "crateDistribution", component: CrateDistributionComponent, canActivate: [AuthGuard] },
                          { path: "receiveCrates", component: ReceiveCratesComponent, canActivate: [AuthGuard] }
              ]
            }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AhoRoutingModule { }
