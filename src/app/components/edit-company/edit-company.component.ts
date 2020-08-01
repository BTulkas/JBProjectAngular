import { AdminService } from './../../services/admin.service';
import { Company } from './../../models/company.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  editCompanyForm:FormGroup;
  company:Company;
  // To extract company from url param
  compId = this.route.snapshot.params.compId

  constructor(
    private adminService:AdminService,
    private route:ActivatedRoute,
    private fb:FormBuilder,
    private router:Router,
  ) { }

  ngOnInit(): void {

    this.editCompanyForm = this.fb.group({
      companyId:[{value:"", disabled:true}],
      name:[{value:"", disabled:true}],
      email:["", [Validators.required, Validators.email]],
      password:[""]
    });

    
    // Gets the company to edit via url param
    this.adminService.getOneCompany(this.compId).subscribe(
      comp=>{
        // Saves the company to class level variable
        this.company=comp;

        // Pre-populates the form fields with the company values
        this.editCompanyForm.controls['companyId'].setValue(comp.companyId),
        this.editCompanyForm.controls['name'].setValue(comp.name),
        this.editCompanyForm.controls['email'].setValue(comp.email)
      },
      err=>{alert(err.error)}
    );

  }


  updateCompany(){
    
    // Sets company values to form values
    if(this.editCompanyForm.valid){
      this.company.email = this.editCompanyForm.controls['email'].value;
      
      // Checks if a new password is given before setting it
      let newPass = this.editCompanyForm.controls['password'].value;
      if(newPass != "")
        this.company.password = newPass;
      
      // Sends the modified company to the server
      this.adminService.updateCompany(this.company).subscribe(
        comp=>{
          alert("Success! "+comp.name+" updated!");
          this.router.navigate(["companies"]);
        },
        err=>{alert(err.error)}
        );
    }
    return;        
  }


  deleteCompany(){
    this.adminService.deleteCompany(this.compId).subscribe(
      response=>{
        alert(response);
        this.router.navigate(["companies"]);
      },
      err=>{alert(err.error)}
    );
  }

}
