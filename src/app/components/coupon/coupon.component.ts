import { Router } from '@angular/router';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit, Input } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styles: [
  ]
})
export class CouponComponent implements OnInit {

  // Injectable to generate coupon lists from single component
  @Input() coupon:Coupon;
  // Injectable for special behaviors in parent components
  @Input('parent') parentName:string;

  constructor(
    private customerService:CustomerService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }


  // To expose customer specific features
  isCustomer(){
    if(sessionStorage.getItem('role')=='Customer') return true;
    else return false;
  }


  // To expose company specific features
  isCompany(){
    if(sessionStorage.getItem('role')=='Company') return true;
    else return false;
  }

  // Every company's favorite button
  purchase(){
    this.customerService.purchaseCoupon(this.coupon.couponId)
    .subscribe(
      ()=>{
        alert("Capitalism Finished Successfully");
      }, (err)=>{
        alert(err.error);
      }
    )
  }

  // TS router for easier params
  goToEdit(){
    this.router.navigate(["edit-coupon", this.coupon.couponId])
  }

}
