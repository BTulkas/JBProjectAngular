import { CategoryType } from './../models/category-type.enum';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coupon } from '../models/coupon';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient:HttpClient) { }

  getCustomerCoupons(){
    return this.httpClient.get<Coupon[]>('http://localhost:8080/customer/'+sessionStorage.token+'/coupons');
  }

  getCustomerCouponsByCategory(category:CategoryType){
    return this.httpClient.get<Coupon[]>('http://localhost:8080/customer/'+sessionStorage.token+'/coupons/category/'+category);
  }

  getCustomerCouponsByPrice(maxPrice:number){
    return this.httpClient.get<Coupon[]>('http://localhost:8080/customer/'+sessionStorage.token+'/coupons/price/'+maxPrice);
  }

  purchaseCoupon(couponId:number){
    return this.httpClient.post('http://localhost:8080/customer/'+sessionStorage.token, couponId);
  }

}
