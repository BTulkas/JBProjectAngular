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
  // Empty coupon list for custructor
  coupons:Coupon[]=[];


  constructor(
    private adminService:AdminService,
    private fb:FormBuilder,
    private router:Router,
  ) { }

  ngOnInit(): void {

    this.addCompanyForm = this.fb.group({
      name:["", Validators.required],
      email:["", Validators.required],
      password:["", Validators.required]
    })

  }

  addCompany(){
    if(this.addCompanyForm.valid){
      const company:Company = new Company(
        0,
        this.addCompanyForm.controls['name'].value,
        this.addCompanyForm.controls['email'].value,
        this.addCompanyForm.controls['password'].value,
        this.coupons
        );
        
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
