import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { HomePageHeaderComponent } from './home-layout/home-page-header/home-page-header.component';
import { BannerComponent } from './home-layout/banner/banner.component';
import { HomePageFooterComponent } from './home-layout/home-page-footer/home-page-footer.component';
import { BrandLogoComponent } from './home-layout/brand-logo/brand-logo.component';



@NgModule({
  declarations: [HomeLayoutComponent, HomePageHeaderComponent, BannerComponent, HomePageFooterComponent, BrandLogoComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ], 
  providers: []
})
export class HomeModule { }
