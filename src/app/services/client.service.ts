import { Company } from './../models/company.model';
import { Coupon } from '../models/coupon';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient:HttpClient) { }

  getAllCoupons(){
    return this.httpClient.get<Coupon[]>('http://localhost:8080/client');
  }
  
  getCompanyFromCoupon(coupId:number){
    return this.httpClient.get<Company>('http://localhost:8080/compfromcoup/'+coupId);
  }

}
