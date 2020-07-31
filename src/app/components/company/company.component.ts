import { Router } from '@angular/router';
import { Company } from './../../models/company.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  @Input() company:Company;
  @Input('parent') parentName:string;

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  goToEdit(){
    this.router.navigate(["edit-company/", this.company.companyId]);
  }

}
