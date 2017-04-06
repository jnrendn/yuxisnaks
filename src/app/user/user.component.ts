import { Component } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
    selector: 'my-user',
    templateUrl: './user.component.html'
})

export class UserComponent{
    name:any;
    authUid:any;
    userData = { };

    constructor(public af: AngularFire) {
        this.af.auth.subscribe(auth => {
        if(auth) {
            this.userData['displayName'] = "Juan José Rendón";
            this.userData['photoURL'] = "http://dsi-vd.github.io/patternlab-vd/images/fpo_avatar.png";
          }
      });
    }

}
