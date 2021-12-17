import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full'
  }, 
  {
    path: 'admin',
    canActivate: [AuthGuard],
    redirectTo: 'admin',
    pathMatch: 'full'
  }, {
    path: 'supplier',
    canActivate: [AuthGuard],
    redirectTo: 'supplier',
    pathMatch: 'full'
  }, {
    path: 'aho',
    canActivate: [AuthGuard],
    redirectTo: 'aho',
    pathMatch: 'full'
  }, {
    path: 'dm',
    canActivate: [AuthGuard],
    redirectTo: 'dm',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
