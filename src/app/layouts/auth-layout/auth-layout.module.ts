import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../../pages/login/login.component';
import { LoginAccountComponent } from '../../pages/loginAccount/loginAccount.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { RegisterAccountComponent } from '../../pages/registerAccount/registerAccount.component';
import { NewOpportunityComponent } from '../../pages/newOpportunity/newOpportunity.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule
    // NgbModule
  ],
  declarations: [
    LoginComponent,
    LoginAccountComponent,
    RegisterComponent,
    RegisterAccountComponent,
    NewOpportunityComponent
  ]
})
export class AuthLayoutModule { }
