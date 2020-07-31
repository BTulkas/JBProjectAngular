import { Router } from '@angular/router';
import { Company } from './../../models/company.model';
import { Customer } from './../../models/customer.model';
import { CategoryType } from './../../models/category-type.enum';
import { Coupon } from 'src/app/models/coupon';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from './../../services/company.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit {

  addCouponForm:FormGroup;
  categories:String[]=[];
  // Empty customer list for constructor
  purchasedBy:Customer[]=[];
  // Mock company for constructor, company connection done serverside
  loggedCompany:Company;

  constructor(
    private companyService:CompanyService,
    private fb:FormBuilder,
    private router:Router) { }

  ngOnInit(): void {


    this.addCouponForm = this.fb.group({
      title:["", Validators.required],
      category:["", Validators.required],
      description:[""],
      startDate:["", Validators.required],
      endDate:["", [Validators.required, ]],
      amount:["", [Validators.required, Validators.min(1)]],
      price:["", [Validators.required, Validators.min(0)]],
      image:[""]
    })

    for(let c in CategoryType){this.categories.push(c)};

  }

  addCoupon(){
    if(this.addCouponForm.valid){
      const coupon:Coupon = new Coupon(
        0,
        this.loggedCompany,
        this.addCouponForm.controls['category'].value,
        this.addCouponForm.controls['title'].value,
        this.addCouponForm.controls['description'].value,
        this.addCouponForm.controls['startDate'].value,
        this.addCouponForm.controls['endDate'].value,
        this.addCouponForm.controls['amount'].value,
        this.addCouponForm.controls['price'].value,
        this.addCouponForm.controls['image'].value,
        this.purchasedBy
        );
        
      this.companyService.addCoupon(coupon).subscribe(
        coupon=>{
          alert("Huzza! Added "+ coupon.title);
          this.router.navigate(["company-coupons"]);
        },
        err=>{
          alert(err.error);
        }
        );
    }
    return;
  }

}
