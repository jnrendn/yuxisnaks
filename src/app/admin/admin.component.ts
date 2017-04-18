import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector:'my-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})


export class AdminComponent {
  users: FirebaseListObservable<any[]>;
  
  constructor(public af: AngularFire, private router:Router) {
      this.af.auth.subscribe(auth => {
          if (auth) {
            this.getAllUsers();
            this.af.database.object(`user/${auth.uid}`).subscribe( info =>{
              console.log(info.admin)
              if(info.admin == false ){
                this.router.navigateByUrl('/product');
              }
            })
          }else {
              this.router.navigateByUrl('/product');
              
          }
      });

  }

  getAllUsers(): void {
    this.users = this.af.database.list('/user');
    this.users.subscribe(u => {
      console.log(u)
    })
  } 
}
