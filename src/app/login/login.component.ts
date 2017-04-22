import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

import { MdlDialogReference } from "angular2-mdl";
import * as Firebase from 'firebase';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {
    state: string = '';
    error: any;
    showSpinner: boolean = false;
    userInfo: any[] = [];

    // Login info
    username: any = 'juan.villa@yuxiglobal.com';
    password: any = '11208444';

    // Sign Up  Info
    email: string;
    pwd: string;
    pwd_r: string;
    fullname: string;
    phone: string;

    // Reset Password
    email_rec: string;
    resetMessage: any;


    Login: boolean = true;
    Register: boolean = false;
    Reset: boolean = false;

    constructor(public af: AngularFire, private router: Router, public dialog: MdlDialogReference) {
        this.dialog.onHide().subscribe((user) => {
            if (user) {
                console.log('authenticated user', user);
            }
        })
    }


    @HostListener('keydown.esc')
    public onEsc(): void {
        this.dialog.hide();
    }


    login() {
      this.showSpinner = true;
        this.error = "";
        this.af.auth.login({
                email: this.username,
                password: this.password
            },
                {
                    provider: AuthProviders.Password,
                    method: AuthMethods.Password,
                }).then(
                (success) => {
                  this.showSpinner = false;
                    this.dialog.hide();
                    if (success.auth.emailVerified) {
                        this.af.database.object(`user/${success.auth.uid}`).subscribe(item => {
                            if (item.admin) {
                                this.router.navigateByUrl('/')
                            } else {
                                this.router.navigateByUrl('/');
                            }
                        })

                    } else {
                      this.showSpinner = false;
                        this.error = "This user has not email verified"
                        this.af.auth.logout().then(() => { console.log('logged out'); })
                    }


                }).catch(
                (err) => {
                  this.showSpinner = false;
                    this.error = err;
                })
    }

    showRegister() {
      this.Login = false;
      this.Register = true;
      this.Reset = false;
    }

    showReset() {
      this.Login = false;
      this.Register = false;
      this.Reset = true;
    }

    showLogin() {
      this.Login = true;
      this.Register = false;
      this.Reset = false;
    }

    resetPassword() {
        Firebase.auth().sendPasswordResetEmail(this.email_rec).then((success) => {
        console.log(success);
        this.resetMessage = "we've sent you an email of password reset";
      })
        .catch(
        (err) => {
          console.log(err);
          this.resetMessage = err;
        })
    }


    // onSubmit(formData) {

    //     if (formData.valid) {
    //         this.af.auth.login({
    //             email: formData.value.email,
    //             password: formData.value.password
    //         },
    //             {
    //                 provider: AuthProviders.Password,
    //                 method: AuthMethods.Password,
    //             }).then(
    //             (success) => {
    //                 if (success.auth.emailVerified) {
    //                     this.af.database.object(`user/${success.auth.uid}`).subscribe(item => {
    //                         if (item.admin) {
    //                             this.router.navigateByUrl('/admin')
    //                         } else {
    //                             this.router.navigateByUrl('/product');
    //                         }
    //                     })

    //                 } else {
    //                     this.af.auth.logout().then(() => { console.log('logged out'); })
    //                     alert('This user has not email verified');
    //                 }


    //             }).catch(
    //             (err) => {
    //                 alert(err.message);
    //                 console.log(err);
    //                 this.error = err;
    //             })
    //     }
    // }
}
