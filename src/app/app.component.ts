import "rxjs/add/operator/filter";
import "rxjs/add/operator/first";

import { Component } from '@angular/core';

import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { AddproductService } from './addproduct.service';
import { ActiveUser } from "./active-user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ActiveUser]
})
export class AppComponent {
  title = 'app works!';

  name: any;
  state: string = '';
  hide: boolean = true;

  constructor(public af: AngularFire, public router: Router, public productService: AddproductService, public userServ: ActiveUser) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.name = auth;
        this.hide = false;
      } else {
        this.hide = true;
      }
    });
  }

  logout() {
    this.af.auth
      .filter((authState) => !authState)
      .first()
      .subscribe(() => this.router.navigate(['/']));
    this.af.auth.logout()
      .then(() => {
        console.log('logged out');
        alert("You're Logged out")
      })
  }

}
