import { Company } from './../../models/company.model';
import { Router } from '@angular/router';
import { AdminService } from './../../services/admin.service';
import { Coupon } from './../../models/coupon';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  addCompanyForm:FormGroup;
  // Empty coupon list for constructor
  coupons:Coupon[]=[];


  constructor(
    private adminService:AdminService,
    private fb:FormBuilder,
    private router:Router,
  ) { }

  ngOnInit(): void {
    
    // Ensures the user is of correct role because component does not come from service
    if(!(sessionStorage.role == "Administrator")){
      alert("Access denied!");
      this.router.navigate([""]);
    }

    this.addCompanyForm = this.fb.group({
      name:["", Validators.required],
      email:["", Validators.required],
      password:["", Validators.required]
    })

  }

  addCompany(){
    if(this.addCompanyForm.valid){
      // Constructs the company object from the form
      const company:Company = new Company(
        0,
        this.addCompanyForm.controls['name'].value,
        this.addCompanyForm.controls['email'].value,
        this.addCompanyForm.controls['password'].value,
        this.coupons
        );
      
      // Posts the object to the server
      this.adminService.addCompany(company).subscribe(
        company=>{
          alert("Huzza! "+company.name+" has been added!");
          this.router.navigate(["companies"]);
        },
        err=>{
          alert(err.error)
        }
        );
    }
    return;
  }

}
