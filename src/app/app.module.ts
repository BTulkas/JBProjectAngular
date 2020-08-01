import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowseCouponsComponent } from './components/browse-coupons/browse-coupons.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerCouponsComponent } from './components/customer-coupons/customer-coupons.component';
import { CompanyCouponsComponent } from './components/company-coupons/company-coupons.component';
import { EditCouponComponent } from './components/edit-coupon/edit-coupon.component';
import { AddCouponComponent } from './components/add-coupon/add-coupon.component';
import { BrowseCompaniesComponent } from './components/browse-companies/browse-companies.component';
import { CompanyComponent } from './components/company/company.component';
import { CustomerComponent } from './components/customer/customer.component';
import { BrowseCustomersComponent } from './components/browse-customers/browse-customers.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    BrowseCouponsComponent,
    NavBarComponent,
    CouponComponent,
    LoginComponent,
    CustomerCouponsComponent,
    CompanyCouponsComponent,
    EditCouponComponent,
    AddCouponComponent,
    BrowseCompaniesComponent,
    CompanyComponent,
    CustomerComponent,
    BrowseCustomersComponent,
    EditCustomerComponent,
    EditCompanyComponent,
    AddCompanyComponent,
    AddCustomerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:ErrorsInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
