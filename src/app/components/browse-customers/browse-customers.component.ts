import { AdminService } from './../../services/admin.service';
import { Customer } from './../../models/customer.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-browse-customers',
  templateUrl: './browse-customers.component.html',
  styleUrls: ['./browse-customers.component.css']
})
export class BrowseCustomersComponent implements OnInit {

  // Empty list of customers to be initialized
  customers:Customer[];
  // For use as @Input() in CustomerComponent
  customer:Customer;
  // For use as @Input() in CustomerComponent
  parent:string='customers'

  constructor(
    private adminService:AdminService
  ) { }

  ngOnInit(): void {

    // Initialize customers list
    this.adminService.getAllCustomers().subscribe(
      newCustomers=>{
        this.customers=newCustomers;
      },
      err=>{alert(err.error)}
    );
  }

}
