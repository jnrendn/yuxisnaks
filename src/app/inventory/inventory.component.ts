import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AddproductService } from 'app/addproduct.service';

import { CreateProductComponent } from './../create-product/create-product.component';

import { MdlDialogReference, MdlDialogService } from 'angular2-mdl';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  // products: FirebaseListObservable<any[]>;
  constructor(
    public productService: AddproductService,
    public af: AngularFire,
    public dialog: MdlDialogService
  ) {  }

  ngOnInit() {
    // this.products = this.getProducts();
  }

  // getProducts(): FirebaseListObservable<any[]> {
  // return this.af.database.list('/products');
  // }

  openDialog() {

    let pDialog = this.dialog.showCustomDialog({
      component: CreateProductComponent,
      isModal: true,
      styles: {'width': '300px' , 'height': 'auto', 'max-height': '500px', 'overflow-y': 'auto'},
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400
    });

    pDialog.subscribe((dialogReference: MdlDialogReference) => {
      console.log('dialog visible', dialogReference);
    });
  }



}
