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

  coupons:Coupon[];
  coupon:Coupon;
  parent:String = "browse";

  constructor(private clientService:ClientService) { }

  ngOnInit(): void {
    this.clientService.getAllCoupons().subscribe(
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
