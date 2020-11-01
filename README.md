# JBProjectFrontEnd

This is the frontend code of the final project in the John Bryce Fullstack Java course. The Coupon Project is a RESTful coupon management CRUD application written with Spring Boot that has three possible end-users: an admin user for managing companies and customers, a company user for managing coupons and finally a customer user for purchasing coupons.

## Technologies and Deployment
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.6.
To set up Angular follow the instructions in the [official site](https://angular.io/guide/setup-local).
Run `ng serve` CLI command for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

This project contains the frontend code only, therefore it requires that you run the backend code found [here](https://github.com/BTulkas/JBPRoject2). Both development servers must run simultaneously with different ports (default 4200 for frontend server, 3306 for backend server).

## Overview
The models are 1:1 TypeScript representations of the backend Java beans, including the ClientType, which on the backend side lives in the login_manager folder for convenience.

The services, likewise, are a 1:1 match with the backend Java controllers as they are intended to interact with it.

The company, coupon and customer components are injectable components that are only called for list generation.

To prevent infinite loops in JSON generation, coupons are called from the backend without a company. The company is called separately and attached back to the coupon using the getCompanyFromCoupon service method in the parent component.
All other components behave as their names suggest.

