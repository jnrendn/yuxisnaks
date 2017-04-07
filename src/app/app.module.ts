import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from 'environments/firebase.config';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { UserComponent } from './user/user.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent }  from './login/login.component';
import { ResetPasswordComponent } from './resetpassword/reset-password.component';
import { UserHistoryComponent } from './userHistory/user-history.component';
import { AdminComponent } from './admin/admin.component';
import { FooterComponent } from './footer/footer.component';


import { AddproductService } from 'app/addproduct.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CartComponent,
    UserComponent,
    SignupComponent,
    LoginComponent,
    ResetPasswordComponent,
    UserHistoryComponent,
    AdminComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [ AddproductService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
