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

  // Empty list of coupons to be initialized
  coupons:Coupon[];
  // For use as @Input() in CouponComponent
  coupon:Coupon;
  // For use as @Input() in CouponComponent
  parent:String="companyCoupons";
  // Initialized empty list of categories for HTML Select
  categories:String[]=[];
  
  priceForm:FormGroup;
  categoryForm:FormGroup;
  
  constructor(
    private clientService:ClientService,
    private companyService:CompanyService,
    private fb:FormBuilder
    ) { }
  
  ngOnInit(): void {
    
    // Initialize with all company coupons
    this.getAll();
    
    this.priceForm = this.fb.group({
      price:["", Validators.required]
    });
    
    this.categoryForm = this.fb.group({
      categorySelect:["", Validators.required]
    });
    
    // Fills the categories list from the enum
    for(let c in CategoryType){this.categories.push(c)};

  }


  // Sets coupons list to all company coupons
  getAll(){
    this.companyService.getCompanyCoupons().subscribe(
      newCoupons=>{
        // Adds company back to each coupon because @JsonIgnore
        newCoupons.forEach(c=>{
          this.clientService.getCompanyFromCoupon(c.couponId).subscribe(
            company=>{
              c.company = company;
            },
            err=>{
              alert(err.error);
            }
            );
          })
          this.coupons = newCoupons;
        },
        err=>{
          alert(err.error);
        });
  }


  // Sets coupons list to company coupons up to given price
  getPrice(){
    this.companyService.getCompanyCouponsByPrice(this.priceForm.controls['price'].value).subscribe(
      newCoupons=>{
        // Adds company back to each coupon because @JsonIgnore
        newCoupons.forEach(c=>{
          this.clientService.getCompanyFromCoupon(c.couponId).subscribe(
            company=>{
              c.company = company;
            },
            err=>{
              alert(err.error);
            }
            );
          })
          this.coupons = newCoupons;
        },
        err=>{
          alert(err.error);
        });
  }

  
  // Sets coupons list to company coupons of given category
  getCategory(){
    this.companyService.getCompanyCouponsByCategory(this.categoryForm.controls['categorySelect'].value).subscribe(
      newCoupons=>{
        // Adds company back to each coupon because @JsonIgnore
        newCoupons.forEach(c=>{
          this.clientService.getCompanyFromCoupon(c.couponId).subscribe(
            company=>{
              c.company = company;
            },
            err=>{
              alert(err.error);
            }
            );
          })
          this.coupons = newCoupons;
        },
        err=>{
          alert(err.error);
        });
  }

}
