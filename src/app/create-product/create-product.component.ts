import { Component, HostListener } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { MdlDialogReference } from 'angular2-mdl';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {

prod: FirebaseListObservable<any>;

showSpinner: boolean = false;

productInfo = { };
name: any = '';
price: any = '';
cant: any = '';
image: any = '';


  constructor(private dialog: MdlDialogReference, private af: AngularFire) {


    this.dialog.onHide().subscribe((product)=>{
      console.log('create product dialog hidden');
      if(product){
        console.log('create product: ', product);
      }
    })
   }

   @HostListener('keydown.esc')
   public onEsc(): void {
       this.dialog.hide();
   }

   newProduct(){
     this.showSpinner=true;

     this.productInfo['productName'] = this.name;
     this.productInfo['productPrice'] = this.price;
     this.productInfo['productCant'] = this.cant;
     this.productInfo['productImage'] = this.image;

     this.af.database.list(`/products`).push(this.productInfo)
     .then(() =>{
       this.showSpinner = false;
       this.dialog.hide();
     }).catch(()=>{
       this.showSpinner = false;
       this.dialog.hide();
     })




   }

}
