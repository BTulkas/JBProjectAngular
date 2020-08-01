import { ClientService } from '../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';

@Component({
  selector: 'app-browse-coupons',
  templateUrl: './browse-coupons.component.html',
  styleUrls: ['./browse-coupons.component.css'
  ]
})
export class BrowseCouponsComponent implements OnInit {

  // Empty list of coupons to be initialized
  coupons:Coupon[];
  // For use as @Input() in CouponComponent
  coupon:Coupon;
  // For use as @Input() in CouponComponent
  parent:String = "browse";

  constructor(private clientService:ClientService) { }

  ngOnInit(): void {

    // Initialize coupons list
    this.clientService.getAllCoupons().subscribe(
      newCoupons=>{
        // Adds company back to each coupon because @JsonIgnore
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
