import "rxjs/add/operator/filter";
import "rxjs/add/operator/first";

import { Component } from '@angular/core';

import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { AddproductService } from './addproduct.service';
import { ActiveUser } from "./active-user.service";

import { MdlDialogService } from "angular2-mdl";
import { LoginComponent } from "./login/login.component";
import { MdlDialogReference } from "angular2-mdl";

import { MdlSnackbarService } from "angular2-mdl";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ActiveUser]
})
export class AppComponent {

  admin: boolean;
  state: string = '';
  hide: boolean;
  user: any[] = [];
  hideLogin: boolean =  false;

  constructor(public af: AngularFire,
    public router: Router,
    public productService: AddproductService,
    public userServ: ActiveUser,
    public dialog: MdlDialogService,
     private mdlSnackbarService: MdlSnackbarService) {
    this.af.auth.subscribe(auth => {

      if (auth) {
        this.hide = false;
        this.hideLogin = true
        this.af.database.object(`user/${auth.uid}`)
          .subscribe(info =>{
            this.user = [];
            this.user.push({
              'email': info.email,
              'name': info.name,
              'admin': info.admin
            })
            this.admin = info.admin;
            console.log(this.admin);
          })
      } else {
        this.hide = true;
        this.hideLogin = false;
      }
    });
  }

  logout() {
    this.af.auth
      .filter((authState) => !authState)
      .first()
      .subscribe(() => this.router.navigate(['/']));
    this.af.auth.logout()
      .then(() => {
        this.showLoggedOutSnack();
        console.log('logged out');
      })
  }

  showLoggedOutSnack() {
      this.mdlSnackbarService.showToast("You are logged out now", 4000);
    }

  showAlert() {

    let pDialog = this.dialog.showCustomDialog({
      component: LoginComponent,
      isModal: true,
      styles: {'width': '300px' , 'height': 'auto', 'max-height': '400px', 'overflow-y': 'auto'},
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400
    });

    pDialog.subscribe((dialogReference: MdlDialogReference) => {
      console.log('dialog visible', dialogReference);
    });
  }
}
