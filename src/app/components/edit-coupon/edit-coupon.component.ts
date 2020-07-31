import { CategoryType } from './../../models/category-type.enum';
import { ClientService } from './../../services/client.service';
import { Coupon } from './../../models/coupon';
import { CompanyService } from './../../services/company.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-coupon',
  templateUrl: './edit-coupon.component.html',
  styleUrls: ['./edit-coupon.component.css']
})
export class EditCouponComponent implements OnInit {
  
  editCouponForm:FormGroup;
  coupon:Coupon;
  categories:String[]=[];
  coupId = this.route.snapshot.params.coupId;


  constructor(
    private companyService:CompanyService,
    private clientService:ClientService,
    private fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.editCouponForm = this.fb.group({
      title:["", Validators.required],
      category:["", Validators.required],
      description:[""],
      startDate:["", Validators.required],
      endDate:["", [Validators.required, ]],
      amount:["", [Validators.required, Validators.min(1)]],
      price:["", [Validators.required, Validators.min(0)]],
      image:[""]
    })
    
    this.companyService.getOneCoupon(this.coupId).subscribe(
      coup=>{
        this.clientService.getCompanyFromCoupon(this.coupId).subscribe(
          comp=>{
            coup.company = comp;
          },err=>{alert(err.error)}
        );

        this.companyService.getCustomersFromCoupon(this.coupId).subscribe(
          custs=>{
            this.coupon.purchasedBy = custs;
          }, err=>{alert(err.error)}
        );

        this.coupon = coup;
        
        this.editCouponForm.controls['category'].setValue(coup.category),
        this.editCouponForm.controls['title'].setValue(coup.title),
        this.editCouponForm.controls['description'].setValue(coup.description),
        this.editCouponForm.controls['startDate'].setValue(coup.startDate),
        this.editCouponForm.controls['endDate'].setValue(coup.endDate),
        this.editCouponForm.controls['amount'].setValue(coup.amount),
        this.editCouponForm.controls['price'].setValue(coup.price),
        this.editCouponForm.controls['image'].setValue(coup.image)
      }, err=>{alert(err.error)}
      );


    for(let c in CategoryType){this.categories.push(c)};

  }
  

  updateCoupon(){
    if(this.editCouponForm.valid){
      this.coupon.category = this.editCouponForm.controls['category'].value;
      this.coupon.title = this.editCouponForm.controls['title'].value;
      this.coupon.description = this.editCouponForm.controls['description'].value;
      this.coupon.startDate = this.editCouponForm.controls['startDate'].value;
      this.coupon.endDate = this.editCouponForm.controls['endDate'].value;
      this.coupon.amount = this.editCouponForm.controls['amount'].value;
      this.coupon.price = this.editCouponForm.controls['price'].value;
      this.coupon.image = this.editCouponForm.controls['image'].value;
      
      
      this.companyService.updateCoupon(this.coupon).subscribe(
        coup=>{
          alert("Success! "+ coup.title +" updated.");
          this.router.navigate(["company-coupons"]);
        },
        err=>{alert(err.error)}
        );
    }
    return;
  }

    
  deleteCoupon(){
    this.companyService.deleteCoupon(this.coupon.couponId).subscribe(
      response=>{
        alert(response);
        this.router.navigate(["company-coupons"])
      },
      err=>{alert(err.error)}
    );
  }

}
