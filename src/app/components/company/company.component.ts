import { Router } from '@angular/router';
import { Company } from './../../models/company.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  // Injectable to generate company lists from single component
  @Input() company:Company;
  // Injectable for special behaviours in parent components
  @Input('parent') parentName:string;

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  // TS router for easier params
  goToEdit(){
    this.router.navigate(["edit-company/", this.company.companyId]);
  }

}
