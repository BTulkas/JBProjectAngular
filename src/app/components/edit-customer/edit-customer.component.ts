import { AdminService } from './../../services/admin.service';
import { Customer } from './../../models/customer.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  editCustomerForm:FormGroup;
  customer:Customer;
  // To extract customer from url param
  custId = this.route.snapshot.params.custId;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private adminService:AdminService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {

    this.editCustomerForm = this.fb.group({
      customerId:[{value:"", diabled:true}],
      firstName:["", Validators.required],
      lastName:["", Validators.required],
      email:["", [Validators.required, Validators.email]],
      password:[""]
    });

    // Gets the customer to edit via url param
    this.adminService.getOneCustomer(this.custId).subscribe(
      cust=>{
        // Saves the customer to class level variable
        this.customer = cust;

        // Pre-populates the form fields with the customer values
        this.editCustomerForm.controls['customerId'].setValue(cust.customerId);
        this.editCustomerForm.controls['firstName'].setValue(cust.firstName);
        this.editCustomerForm.controls['lastName'].setValue(cust.lastName);
        this.editCustomerForm.controls['email'].setValue(cust.email);
      },
      err=>{alert(err.error)}
    );

  }

  
  updateCustomer(){

    // Sets customer values to form values
    if(this.editCustomerForm.valid){
      this.customer.firstName = this.editCustomerForm.controls['firstName'].value;
      this.customer.lastName = this.editCustomerForm.controls['lastName'].value;
      this.customer.email = this.editCustomerForm.controls['email'].value;
      
      // Checks if a new password is given before setting it
      let newPass = this.editCustomerForm.controls['password'].value;
      if(newPass!="")
      this.customer.password = newPass;
      
      // Sends the modified customer to the server
      this.adminService.updateCustomer(this.customer).subscribe(
        cust=>{
          alert("Success! "+cust.firstName + " " +cust.lastName+" updated!");
          this.router.navigate(["customers"]);
        },
        err=>{alert(err.error)}
        );
    }
    return;
  }


  deleteCustomer(){
    this.adminService.deleteCustomer(this.custId).subscribe(
      response=>{
        alert(response);
        this.router.navigate(["customers"]);
      },
      err=>{alert(err.error)}
    );
  }

}
