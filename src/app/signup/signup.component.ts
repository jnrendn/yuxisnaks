import { Component } from '@angular/core';
import { Router }    from '@angular/router';
import { AngularFire, AuthMethods, AuthProviders,  } from 'angularfire2';


@Component({
    selector: 'my-signup',
    templateUrl: './signup.component.html',
    styleUrls: [ './signup.component.css' ]
})

export class SignupComponent {

    noMatch: boolean = false;
    state: string = '';
    error: any;
    user = { };

    constructor(public af:AngularFire, private router: Router) { }
    
      onSubmit(formData) {
        if(formData.valid) {
            if(formData.value.password == formData.value.pass){
                this.user['email'] = formData.value.email;
                this.user['name'] = formData.value.name;
                this.user['phone'] = formData.value.phone;

                console.log(formData.value);
                this.af.auth.createUser({
                    email: formData.value.email,
                    password: formData.value.password
                }).then(
                    (success) => {
                    this.af.database.object(`/user/${success.auth.uid}`).set(this.user);
                    console.log(success);
                    this.af.auth.subscribe(auth => { 
                        if(auth) {
                            this.router.navigateByUrl('/user');
                            }
                        });
                }).catch(
                    (err) => {
                    console.log(err);
                    this.error = err;
                })
            }else{
                this.noMatch = true;
                alert("password don't match")
            }
        }
    }


 }