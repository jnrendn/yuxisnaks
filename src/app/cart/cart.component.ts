import { Component, OnInit } from '@angular/core';
import { AddproductService } from 'app/addproduct.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  authUser: any;
  purshases: FirebaseListObservable<any[]>;
  date: any;
  hide:boolean = true;

  constructor(public addproductService: AddproductService, public af: AngularFire) {
    this.af.auth.subscribe( auth => {
      if(auth){
        this.addproductService.enableBuyButton = true;
        this.authUser = auth.uid;
        this.hide =false;
      } else {
        this.addproductService.enableBuyButton = false;
        this.hide = true;
      }
    });
  }

  addtocart(e: any){
  this.addproductService.addProduct(e);
  }

  ngOnInit() { }

  unlistProduct(index: number): void{
    this.addproductService.unlistproduct(index);
  }

  submitpurshase(): void{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    this.date = dd + "-" + mm + "-" + yyyy;
    console.log(this.date);
     this.purshases = this.af.database.list(`user/${this.authUser}/purchases/${this.date}`);

    this.purshases.push(this.addproductService.list_added_products).then(
      (data) => {
        for(var i = 0; i < this.addproductService.list_added_products.length; i++){
          this.af.database.list('/products').update(
            this.addproductService.list_added_products[i].$key,
            { productCant: ( this.addproductService.list_added_products[i].productCant -  this.addproductService.list_added_products[i].UserproductCant) }
          ).then(
            (res) => {
              this.addproductService.list_added_products = [];
            }).catch(
              (err) => {
                console.log(err);
              })
        }
      }).catch(
        (err) => {
          console.log(err);
        });
  }

}
