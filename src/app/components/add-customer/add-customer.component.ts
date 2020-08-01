import { Customer } from './../../models/customer.model';
import { Router } from '@angular/router';
import { AdminService } from './../../services/admin.service';
import { Coupon } from './../../models/coupon';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  addCustomerForm:FormGroup;
  // Empty coupons list for constructor
  coupons:Coupon[]=[];


  constructor(
    private adminService:AdminService,
    private fb:FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {

    // Ensures the user is of correct role because component does not come from service
    if(!(sessionStorage.role == "Administrator")){
      alert("Access denied!");
      this.router.navigate([""]);
    }

    this.addCustomerForm = this.fb.group({
      firstName:["", Validators.required],
      lastName:["", Validators.required],
      email:["", [Validators.required, Validators.email]],
      password:["", Validators.required]
    });
  }


  addCustomer(){
    if(this.addCustomerForm.valid){
      // Constructs the customer object from the form
      const customer:Customer = new Customer(
        0,
        this.addCustomerForm.controls['firstName'].value,
        this.addCustomerForm.controls['lastName'].value,
        this.addCustomerForm.controls['email'].value,
        this.addCustomerForm.controls['password'].value,
        this.coupons
        );
        
      // Posts the object to the server
      this.adminService.addCustomer(customer).subscribe(
        customer=>{
          alert("Huzza! "+customer.firstName+" "+customer.lastName+" has joined us!");
          this.router.navigate(["customers"]);
        },
        err=>{
          alert(err.error);
        }
        );
    }
    return;
  }

}
