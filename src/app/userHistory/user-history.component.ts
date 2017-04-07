import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'my-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})

export class UserHistoryComponent implements OnInit{
  userHistory: FirebaseListObservable<any[]>;
  purchases: FirebaseListObservable<any[]>;
  eachPurch: any[] = [];
  userName: FirebaseListObservable<any[]>;


  ngOnInit(){ }

  constructor(public af: AngularFire, private router:Router) {
      this.getPathProducts();
  }

  getPathProducts() {
      this.af.auth.subscribe(auth => {
          if (auth) {
              // this.userName=this.af.database.list(`user/${auth.uid}`)

              this.userHistory = this.af.database.list(`user/${auth.uid}/purchases`);
              this.userHistory.subscribe( date => {
                this.eachPurch = [];
                date.forEach( pu =>  {
                  this.purchases = this.af.database.list(`user/${auth.uid}/purchases/${pu.$key}`);
                  this.eachPurch.push({
                    'date': pu.$key,
                    'purchases' :this.purchases});
                })
              })

          } else {
              console.log('nope');
              this.router.navigateByUrl('/product');
          }
      });
  }

  onclick1(){
    console.log(this.userName);
  }

}
