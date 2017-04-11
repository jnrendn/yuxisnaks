import { Injectable } from '@angular/core';
import { FirebaseListObservable, AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Injectable()

export class ActiveUser {
    user: any[] = [];
    userO: FirebaseObjectObservable<any>

    constructor(public af: AngularFire, ) {
        this.af.auth.subscribe(auth => {
            if (auth) {
                this.userO = this.af.database.object(`user/${auth.uid}`);
            }
        })
    }

}
