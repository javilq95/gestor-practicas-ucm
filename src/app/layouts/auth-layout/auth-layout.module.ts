import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../../pages/login/login.component';
import { LoginAccountComponent } from '../../pages/loginAccount/loginAccount.component';
import { LoginContactComponent } from '../../pages/loginContact/loginContact.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { RegisterAccountComponent } from '../../pages/registerAccount/registerAccount.component';
import { SupportCaseComponent } from 'src/app/pages/supportCase/supportCase';

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
    LoginContactComponent,
    RegisterComponent,
    RegisterAccountComponent,
    SupportCaseComponent
  ]
})
export class AuthLayoutModule { }
