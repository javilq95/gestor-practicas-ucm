import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { LoginAccountComponent } from '../../pages/loginAccount/loginAccount.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { RegisterAccountComponent } from '../../pages/registerAccount/registerAccount.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'loginAccount',       component: LoginAccountComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'registerAccount',       component: RegisterAccountComponent }
];
