import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private loginService:LoginService,
    private fb:FormBuilder,
    private router:Router
    ) { }

  ngOnInit(): void {
    
    // If user already logged in, redirects to "browse"
    this.isLoggedIn();

    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      client: ["", Validators.required]
    });
  }
  
  isLoggedIn(){
    if(sessionStorage.token){
      this.router.navigate(['browse']);
    }
  }

  
  // Sends login credential to the server
  login(){
    if(this.loginForm.valid){
      this.loginService.login(
        this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value,
        this.loginForm.controls['client'].value)
        .subscribe(
          // Receive token from server and save to session
          tokenFromServer=>{
            sessionStorage.token = tokenFromServer;
            // Saves role to session to match clientType
            sessionStorage.role = this.loginForm.controls['client'].value;
            this.router.navigate(["browse"]);
          }, err=>{
            alert(err.error);
          }
        );
    }
  }

}
