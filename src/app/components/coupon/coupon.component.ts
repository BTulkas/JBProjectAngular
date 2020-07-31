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
  // Injectable for special behaviours in parent components
  @Input('parent') parentName:string;

  constructor(
    private customerService:CustomerService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }

  isCustomer(){
    if(sessionStorage.getItem('role')=='Customer') return true;
    else return false;
  }

  isCompany(){
    if(sessionStorage.getItem('role')=='Company') return true;
    else return false;
  }

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

  goToEdit(){
    this.router.navigate(["edit-coupon", this.coupon.couponId])
  }

}
