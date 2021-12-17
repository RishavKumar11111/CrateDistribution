import { AuthService } from './services/auth.service';
import { AuthModule } from './auth/auth.module';
import { DmModule } from './dm/dm.module';
import { AhoModule } from './aho/aho.module';
import { SupplierModule } from './supplier/supplier.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AdminModule } from './admin/admin.module';
import { RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SupplierFilterPipe } from './supplier-filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    SupplierFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AdminModule,
    RouterModule,
    Ng2SearchPipeModule,
    AhoModule,
    SupplierModule,
    DmModule,
    AuthModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [AuthService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
