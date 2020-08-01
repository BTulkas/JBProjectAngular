import { Router } from '@angular/router';
import { Customer } from './../../models/customer.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  // Injectable to generate customers lists from single component
  @Input() customer:Customer;
  // Injectable for special behaviours in parent components
  @Input('parent') parentName:string;

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  // TS router for easier params
  goToEdit(){
    this.router.navigate(["edit-customer", this.customer.customerId]);
  }

}
