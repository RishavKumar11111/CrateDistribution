import { AuthGuard } from './../auth/auth.guard';
import { ReceiveCrateComponent } from './receive-crate/receive-crate.component';
import { CrateDistributionComponent } from './crate-distribution/crate-distribution.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhoLayoutComponent } from './layout/aho-layout/aho-layout.component';

const routes: Routes = [
            {
              path: 'aho',
              component: AhoLayoutComponent,
              canActivate: [AuthGuard],
              children: [
                          { path: "", redirectTo: "receiveCrates", pathMatch: "full", canActivate: [AuthGuard] },
                          { path: "crateDistribution", component: CrateDistributionComponent, canActivate: [AuthGuard] },
                          { path: "receiveCrates", component: ReceiveCrateComponent, canActivate: [AuthGuard] }
              ]
            }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AhoRoutingModule { }
