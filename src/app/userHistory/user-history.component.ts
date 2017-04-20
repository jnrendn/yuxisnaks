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
  acumPrice:number = 0;
  acumQuant:number = 0;

  ngOnInit(){ }

  constructor(public af: AngularFire, private router:Router) {
      this.getPathProducts();
  }

  getPathProducts() {
      this.af.auth.subscribe(auth => {
          if (auth) {
              this.userHistory = this.af.database.list(`user/${auth.uid}/purchases`);
              this.userHistory.subscribe( date => {
                this.eachPurch = [];
                date.forEach( pu =>  {
                  this.purchases = this.af.database.list(`user/${auth.uid}/purchases/${pu.$key}`)

                  this.purchases.subscribe(purch =>{
                    purch.forEach(item =>{
                      item.forEach(i => {
                        this.acumPrice += (i.productPrice * i.UserproductCant);
                        this.acumQuant += i.UserproductCant;
                      })
                    })
                  })
                  
                  this.eachPurch.push({
                    'date': pu.$key,
                    'purchases' :this.purchases
                  });
                })

              })

          } else {
              this.router.navigateByUrl('/product');
          }
      });
  }


}
