import { AdminService } from './../../services/admin.service';
import { Company } from './../../models/company.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-browse-companies',
  templateUrl: './browse-companies.component.html',
  styleUrls: ['./browse-companies.component.css']
})
export class BrowseCompaniesComponent implements OnInit {

  // Empty list of companies to be initialized
  companies:Company[];
  // For use as @input() in CompanyComponent
  company:Company;
  // For us as @Input() in CompanyComponent
  parent:String="companies"

  constructor(
    private adminService:AdminService,
  ) { }

  ngOnInit(): void {
    
    // Initialize companies list
    this.adminService.getAllCompanies().subscribe(
      newCompanies=>{
        this.companies=newCompanies;
      },
      err=>{alert(err.error)}
    );

  }

}
