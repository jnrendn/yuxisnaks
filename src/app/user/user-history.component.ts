import { Component } from '@angular/core';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'my-history',
  templateUrl: './user-history.component.html'
})

export class UserHistoryComponent {
  userHistory: FirebaseListObservable<any[]>;
  userHistory2: FirebaseObjectObservable<any>;

  preserveSnapshot = true;


  constructor(public af:AngularFire){
    this.af.auth.subscribe( auth => {
      if(auth){
        this.af.database.list(`user/${auth.uid}/purshases`,{ preserveSnapshot:true})
          .subscribe(snapshost =>{
            snapshost.forEach(snapshot =>{
              console.log(snapshot);
            });
          })
        // this.userHistory2 = this.af.database.object(`user/${auth.uid}/purshases`);
        // this.userHistory.forEach(item => console.log(item.));
        // this.userHistory2.forEach(item => console.log(item));
      }else{
        console.log('nope');
      }
    });
  }

}
