import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector:'my-admin',
  templateUrl: './admin.component.html'
})

export class AdminComponent {
  constructor(public af: AngularFire, private router:Router) {
      this.af.auth.subscribe(auth => {
          if (auth) {
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
}
