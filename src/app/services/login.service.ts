import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient) { }

  login(email:string, password:string, clientType:string){

    return this.httpClient.post('http://localhost:8080/login/'+email+'/'+password+'/'+clientType, null, {responseType:'text'});
  }

  logout(){
    return this.httpClient.post('http://localhost:8080/logout', sessionStorage.token);
  }

}