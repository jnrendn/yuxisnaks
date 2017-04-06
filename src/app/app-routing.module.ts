import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './product/product.component';
import { UserComponent }    from './user/user.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent }   from './login/login.component';
import { ResetPasswordComponent } from './resetpassword/reset-password.component';
import { UserHistoryComponent } from './user/user-history.component';

const routes: Routes = [
    { path:'', redirectTo: '/product', pathMatch: 'full' },
    { path: 'product', component: ProductComponent },
    { path: 'user', component: UserComponent },
    { path: 'reg', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'reset' , component: ResetPasswordComponent },
    { path: 'history', component: UserHistoryComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }