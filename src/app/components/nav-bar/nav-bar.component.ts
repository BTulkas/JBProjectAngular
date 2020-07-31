import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'
  ]
})
export class NavBarComponent implements OnInit {
  
  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
  }

  logged(){
    if(sessionStorage.length > 0) return true;
    else return false;
  }

  logout(){
    this.loginService.logout();
    sessionStorage.clear();
    this.router.navigate(["browse"]);
  }

  getRole(){
    switch(sessionStorage.getItem('role')){
      case 'Customer':
        return 'customer';

      case 'Company':
        return 'company';

      case 'Administrator':
        return 'admin';
    }
  }

}
