import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { LoginAccountComponent } from '../../pages/loginAccount/loginAccount.component';
import { LoginContactComponent } from '../../pages/loginContact/loginContact.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { RegisterAccountComponent } from '../../pages/registerAccount/registerAccount.component';
import { SupportCaseComponent } from 'src/app/pages/supportCase/supportCase';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'loginAccount',       component: LoginAccountComponent },
    { path: 'loginContact',       component: LoginContactComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'registerAccount',       component: RegisterAccountComponent },
    { path: 'supportCase',       component: SupportCaseComponent }
];
