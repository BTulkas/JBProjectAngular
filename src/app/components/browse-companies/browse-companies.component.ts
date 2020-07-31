import { AdminService } from './../../services/admin.service';
import { Company } from './../../models/company.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-browse-companies',
  templateUrl: './browse-companies.component.html',
  styleUrls: ['./browse-companies.component.css']
})
export class BrowseCompaniesComponent implements OnInit {

  companies:Company[];
  company:Company;
  parent:String="companies"

  constructor(
    private adminService:AdminService,
  ) { }

  ngOnInit(): void {
    
    this.adminService.getAllCompanies().subscribe(
      newCompanies=>{
        this.companies=newCompanies;
      },
      err=>{alert(err.error)}
    );

  }

}
