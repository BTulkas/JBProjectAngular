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

  // Empty list of coupons to be initialized
  coupons:Coupon[];
  // For use as @Input() in CouponComponent
  coupon:Coupon;
  // For use as @Input() in CouponComponent
  parent:String="customerCoupons";
  // Initialized empty list of categories for HTML Select
  categories:String[]=[];
  
  priceForm:FormGroup;
  categoryForm:FormGroup;
  
  constructor(private clientService:ClientService, private customerService:CustomerService, private fb:FormBuilder) { }
  
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


  // Sets coupons list to all customer coupons
  getAll(){
    this.customerService.getCustomerCoupons().subscribe(
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
          });
          this.coupons = newCoupons;
        },
        err=>{
          alert(err.error);
        });
  }

  
  // Sets coupons list to customer coupons up to given price
  getPrice(){
    this.customerService.getCustomerCouponsByPrice(this.priceForm.controls['price'].value).subscribe(
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

  
  // Sets coupons list to customer coupons of given category
  getCategory(){
    this.customerService.getCustomerCouponsByCategory(this.categoryForm.controls['categorySelect'].value).subscribe(
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
