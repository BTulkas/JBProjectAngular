import { Router } from '@angular/router';
import { Customer } from './../../models/customer.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  @Input() customer:Customer;
  @Input('parent') parentName:string;

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  goToEdit(){
    this.router.navigate(["edit-customer", this.customer.customerId]);
  }

}
