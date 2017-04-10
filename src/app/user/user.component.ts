import { Component } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
    selector: 'my-user',
    templateUrl: './user.component.html'
})

export class UserComponent{
    name:any;
    authUid:any;
    userInfo:any[] = []


    constructor(public af: AngularFire, private router:Router) {
        this.af.auth.subscribe(auth => {
            if (auth) {
              this.af.database.object(`user/${auth.uid}`).subscribe( info =>{
                this.userInfo.push({
                  'name': info.name,
                  'phone': info.phone
                })
              })
            }else {
                this.router.navigateByUrl('/product');
            }
        });
    }

}
