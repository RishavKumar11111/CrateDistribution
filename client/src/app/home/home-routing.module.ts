import { ResolveHomeTemGuard } from '../auth/resolve-home-tem.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './home-layout/home-layout.component';

const routes: Routes = [
  {
    path: 'Home',
    component: HomeLayoutComponent,
    resolve: {
      isLoad: ResolveHomeTemGuard
    }
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class HomeRoutingModule { }
