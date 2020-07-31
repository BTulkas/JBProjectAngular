import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../models/company.model';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient:HttpClient) { }

  // Company mappings
  
  getAllCompanies(){
    return this.httpClient.get<Company[]>('http://localhost:8080/admin/companies/'+sessionStorage.token);
  }

  getOneCompany(compId:number){
    return this.httpClient.get<Company>('http://localhost:8080/admin/company/'+sessionStorage.token+'/'+compId);
  }

  addCompany(company:Company){
    return this.httpClient.post<Company>('http://localhost:8080/admin/companies/'+sessionStorage.token, company);
  }

  updateCompany(company:Company){
    return this.httpClient.put<Company>('http://localhost:8080/admin/company/update/'+sessionStorage.token, company);
  }

  deleteCompany(compId:number){
    return this.httpClient.delete('http://localhost:8080/admin/company/delete/'+sessionStorage.token+'/'+compId, {responseType:'text'});
  }


  // Customer mappings

  getAllCustomers(){
    return this.httpClient.get<Customer[]>('http://localhost:8080/admin/customers/'+sessionStorage.token);
  }

  getOneCustomer(custId:number){
    return this.httpClient.get<Customer>('http://localhost:8080/admin/customer/'+sessionStorage.token+'/'+custId);
  }

  addCustomer(customer:Customer){
    return this.httpClient.post<Customer>('http://localhost:8080/admin/customers/'+sessionStorage.token, customer);
  }

  updateCustomer(customer:Customer){
    return this.httpClient.put<Customer>('http://localhost:8080/admin/customer/update/'+sessionStorage.token, customer);
  }

  deleteCustomer(custId:number){
    return this.httpClient.delete('http://localhost:8080/admin/customer/delete/'+sessionStorage.token+'/'+custId, {responseType:'text'});
  }

}
