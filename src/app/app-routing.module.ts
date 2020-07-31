import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { BrowseCustomersComponent } from './components/browse-customers/browse-customers.component';
import { BrowseCompaniesComponent } from './components/browse-companies/browse-companies.component';
import { AddCouponComponent } from './components/add-coupon/add-coupon.component';
import { EditCouponComponent } from './components/edit-coupon/edit-coupon.component';
import { CompanyCouponsComponent } from './components/company-coupons/company-coupons.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseCouponsComponent } from './components/browse-coupons/browse-coupons.component';
import { LoginComponent } from './components/login/login.component';
import { CustomerCouponsComponent } from './components/customer-coupons/customer-coupons.component';


const routes: Routes = [
  {path:"browse", component: BrowseCouponsComponent},
  {path:"login", component: LoginComponent},
  {path:"customer-coupons", component:CustomerCouponsComponent},
  {path:"company-coupons", component:CompanyCouponsComponent},
  {path:"add-coupon", component:AddCouponComponent},
  {path:"edit-coupon/:coupId", component:EditCouponComponent},
  {path:"companies", component:BrowseCompaniesComponent},
  {path:"add-company", component:AddCompanyComponent},
  {path:"edit-company/:compId", component:EditCompanyComponent},
  {path:"customers", component:BrowseCustomersComponent},
  {path:"add-customer", component:AddCustomerComponent},
  {path:"edit-customer/:custId", component:EditCustomerComponent},
  {path:"", redirectTo:"browse", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
