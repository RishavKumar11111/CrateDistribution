import { HomeModule } from './home/home.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { SupplierModule } from './supplier/supplier.module';
import { AhoModule } from './aho/aho.module';
import { DmModule } from './dm/dm.module';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './common/layout/layout.component';
import { HeaderComponent } from './common/layout/header/header.component';
import { SidebarComponent } from './common/layout/sidebar/sidebar.component';
import { FooterComponent } from './common/layout/footer/footer.component';
import { CookieService } from 'ngx-cookie-service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResolveGuard } from './auth/resolve.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    AdminModule,
    SupplierModule,
    AhoModule,
    DmModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CookieService, ResolveGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
