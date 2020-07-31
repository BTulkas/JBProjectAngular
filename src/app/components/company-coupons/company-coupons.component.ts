import { Router } from '@angular/router';
import { CategoryType } from './../../models/category-type.enum';
import { Coupon } from 'src/app/models/coupon';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from './../../services/company.service';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-coupons',
  templateUrl: './company-coupons.component.html',
  styleUrls: ['./company-coupons.component.css']
})
export class CompanyCouponsComponent implements OnInit {

  coupons:Coupon[];
  coupon:Coupon;
  categories:String[]=[];
  parent:String="companyCoupons";
  priceForm:FormGroup;
  categoryForm:FormGroup;
  
  constructor(
    private clientService:ClientService,
    private companyService:CompanyService,
    private fb:FormBuilder,
    private router:Router
    ) { }
  
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
    this.companyService.getCompanyCoupons().subscribe(
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
    this.companyService.getCompanyCouponsByPrice(this.priceForm.controls['price'].value).subscribe(
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
    this.companyService.getCompanyCouponsByCategory(this.categoryForm.controls['categorySelect'].value).subscribe(
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

  addCoupon(){
    this.router.navigate(["add-coupon"]);
  }

}
