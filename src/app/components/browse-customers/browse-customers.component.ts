import { AdminService } from './../../services/admin.service';
import { Customer } from './../../models/customer.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-browse-customers',
  templateUrl: './browse-customers.component.html',
  styleUrls: ['./browse-customers.component.css']
})
export class BrowseCustomersComponent implements OnInit {

  customers:Customer[];
  customer:Customer;
  parent:string='customers'

  constructor(
    private adminService:AdminService
  ) { }

  ngOnInit(): void {

    this.adminService.getAllCustomers().subscribe(
      newCustomers=>{
        this.customers=newCustomers;
      },
      err=>{alert(err.error)}
    );
  }

}
