import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {
    state: string = '';
    error: any;
    userInfo: any[] = [];

    constructor(public af: AngularFire, private router: Router) {
    }


    onSubmit(formData) {



        if (formData.valid) {
            this.af.auth.login({
                email: formData.value.email,
                password: formData.value.password
            },
                {
                    provider: AuthProviders.Password,
                    method: AuthMethods.Password,
                }).then(
                (success) => {
                    if (success.auth.emailVerified) {
                        this.af.database.object(`user/${success.auth.uid}`).subscribe(item => {
                            if (item.admin) {
                                this.router.navigateByUrl('/admin')
                            } else {
                                this.router.navigateByUrl('/product');
                            }
                        })

                    } else {
                        this.af.auth.logout().then(() => { console.log('logged out'); })
                        alert('This user has not email verified');
                    }


                    //     this.af.database.object(`user/${success.auth.uid}`).subscribe(item =>{
                    //       if(item.admin){
                    //         this.router.navigateByUrl('/admin')
                    //       }else{
                    //         this.router.navigateByUrl('/product');
                    //       }
                    //   })

                }).catch(
                (err) => {
                    alert(err.message);
                    console.log(err);
                    this.error = err;
                })
        }
    }
}
