import  * as Firebase from 'firebase';
import { AngularFire, AuthProviders, AuthMethods, AngularFireAuth  } from 'angularfire2';

import { Component } from '@angular/core';

//Under contruction


import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent {

  constructor( public af:AngularFire ) { }

    onSubmit(formData){
      if(formData.valid){
        
      }
    }
}