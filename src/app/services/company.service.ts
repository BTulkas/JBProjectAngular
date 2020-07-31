import { Customer } from './../models/customer.model';
import { Company } from './../models/company.model';
import { CategoryType } from './../models/category-type.enum';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coupon } from '../models/coupon';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpClient:HttpClient) { }

  getLoggedCompany(){
    return this.httpClient.get<Company>('http://localhost:8080/company/'+sessionStorage.token);
  }

  getCompanyCoupons(){
    return this.httpClient.get<Coupon[]>('http://localhost:8080/company/'+sessionStorage.token+'/coupons');
  }
  
  getOneCoupon(coupId:number){
    return this.httpClient.get<Coupon>('http://localhost:8080/company/'+sessionStorage.token+'/coupon/'+coupId);
  }
  
  getCompanyCouponsByCategory(category:CategoryType){
    return this.httpClient.get<Coupon[]>('http://localhost:8080/company/'+sessionStorage.token+'/category/'+category);
  }

  getCompanyCouponsByPrice(maxPrice:number){
    return this.httpClient.get<Coupon[]>('http://localhost:8080/company/'+sessionStorage.token+'/price/'+maxPrice);
  }

  addCoupon(coupon:Coupon){
    return this.httpClient.post<Coupon>('http://localhost:8080/company/'+sessionStorage.token, coupon);
  }

  updateCoupon(coupon:Coupon){
    return this.httpClient.put<Coupon>('http://localhost:8080/company/'+sessionStorage.token+'/coupon/update', coupon);
  }

  deleteCoupon(coupId:number){
    return this.httpClient.delete('http://localhost:8080/company/'+sessionStorage.token+'/coupon/delete/'+coupId, {responseType:"text"});
  }

  getCustomersFromCoupon(coupId:number){
    return this.httpClient.get<Customer[]>('http://localhost:8080/company/custsfromcoupon/'+sessionStorage.token+'/'+coupId);

  }

}
