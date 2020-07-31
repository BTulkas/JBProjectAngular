import { CategoryType } from './../../models/category-type.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from './../../services/client.service';
import { CustomerService } from './../../services/customer.service';
import { Coupon } from './../../models/coupon';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-customer-coupons',
  templateUrl: './customer-coupons.component.html',
  styleUrls: ['./customer-coupons.component.css']
})
export class CustomerCouponsComponent implements OnInit {

  coupons:Coupon[];
  coupon:Coupon;
  categories:String[]=[];
  parent:String="customerCoupons";
  priceForm:FormGroup;
  categoryForm:FormGroup;
  
  constructor(private clientService:ClientService, private customerService:CustomerService, private fb:FormBuilder) { }
  
  ngOnInit(): void {
    this.getAll();
    
    this.priceForm = this.fb.group({
      price:["", Validators.required]
    });
    
    this.categoryForm = this.fb.group({
      categorySelect:["", Validators.required]
    });
    
    for(let c in CategoryType){this.categories.push(c)};

  }


  getAll(){
    this.customerService.getCustomerCoupons().subscribe(
      newCoupons=>{
        newCoupons.forEach(c=>{
          this.clientService.getCompanyFromCoupon(c.couponId).subscribe(
            company=>{
              c.company = company;
            }
            );
          })
          this.coupons = newCoupons;
        });
  }

  getPrice(){
    this.customerService.getCustomerCouponsByPrice(this.priceForm.controls['price'].value).subscribe(
      newCoupons=>{
        newCoupons.forEach(c=>{
          this.clientService.getCompanyFromCoupon(c.couponId).subscribe(
            company=>{
              c.company = company;
            }
            );
          })
          this.coupons = newCoupons;
        });
  }

  getCategory(){
    this.customerService.getCustomerCouponsByCategory(this.categoryForm.controls['categorySelect'].value).subscribe(
      newCoupons=>{
        newCoupons.forEach(c=>{
          this.clientService.getCompanyFromCoupon(c.couponId).subscribe(
            company=>{
              c.company = company;
            }
            );
          })
          this.coupons = newCoupons;
        });
  }
}
